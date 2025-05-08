import { Server, Socket } from "socket.io";
import {
  initMediasoup,
  createRoom,
  getRoom,
  createWebRtcTransport,
  Peer,
} from "./mediasoup";

export async function setupSocketServer(io: Server) {
  await initMediasoup();
  console.log("Mediasoup worker initialized");
  io.on("connection", (socket: Socket) => {
    let currentRoomId: string;
    console.log(`Socket connected: ${socket.id}`);

    // ------------------------------------------------------------ SIGNALS
    socket.on("joinRoom", async ({ roomId }) => {
      console.log(`[${socket.id}] joinRoom: ${roomId}`);

      currentRoomId = roomId;
      const room = await createRoom(roomId, socket.id);
      if (!room) return;
      socket.join(roomId);
      socket.emit("joinedRoom", {
        rtpCapabilities: room.router.rtpCapabilities,
        producerList: Array.from(room.peers.values()).flatMap((peer) =>
          Array.from(peer.producers.keys())
        ),
      });
    });

    socket.on("leaveRoom", () => {
      const room = getRoom(currentRoomId);
      const peer = room?.peers.get(socket.id);
      if (!room || !peer) return;
      peer.transports.forEach((t) => t.close());
      peer.producers.forEach((p) => p.close());
      peer.consumers.forEach((c) => c.close());
      room.peers.delete(socket.id);
      socket.leave(currentRoomId);
      socket.emit("leftRoom");
    });

    socket.on("createTransport", async ({ isConsumer }, callback) => {
      const room = getRoom(currentRoomId);
      if (!room) {
        console.warn(`[${socket.id}] Tried to createTransport without room`);
        return;
      }

      let peer = room.peers.get(socket.id);
      if (!peer) {
        peer = {
          transports: new Map(),
          producers: new Map(),
          consumers: new Map(),
          details: { role: "user" },
        };
        room.peers.set(socket.id, peer);
      }

      const transport = await createWebRtcTransport(room);
      peer.transports.set(transport.id, transport);

      // Guarda el ID según el tipo de transporte
      if (isConsumer) {
        peer.recvTransportId = transport.id;
      } else {
        peer.sendTransportId = transport.id;
      }

      console.log(
        `[${socket.id}] createTransport: ${transport.id} (${
          isConsumer ? "recv" : "send"
        })`
      );
      callback({
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      });
    });

    socket.on(
      "connectTransport",
      async ({ transportId, dtlsParameters }, callback) => {
        const room = getRoom(currentRoomId);
        const peer = room?.peers.get(socket.id);
        const transport = peer?.transports.get(transportId);
        if (!transport) {
          console.warn(
            `[${socket.id}] Tried to connectTransport without transport`
          );
          return;
        }
        await transport.connect({ dtlsParameters });
        console.log(`[${socket.id}] connectTransport (${transportId})`);
        callback();
      }
    );

    socket.on(
      "produceTransport",
      async ({ kind, rtpParameters, appData }, callback) => {
        const room = getRoom(currentRoomId);
        const peer = room?.peers.get(socket.id) as Peer;
        const transport = peer?.transports.get(appData);
        if (!transport) {
          console.warn(`[${socket.id}] Tried to produce without transport`);
          return;
        }
        const producer = await transport.produce({ kind, rtpParameters });
        peer.producers.set(producer.id, producer);
        console.log(`[${socket.id}] produce: ${producer.id} (${kind})`);
        callback({ id: producer.id, producerExist: !!producer });
        socket
          .to(currentRoomId)
          .emit("newProducer", { producerId: producer.id });
      }
    );

    socket.on(
      "consume",
      async ({ producerId, rtpCapabilities, transportId }, callback) => {
        const room = getRoom(currentRoomId);
        const peer = room?.peers.get(socket.id) as Peer;
        const transport = peer?.transports.get(transportId);
        // Buscar el peer que tiene ese producerId
        let producerPeer;
        for (const p of room?.peers.values() || []) {
          if (p.producers.has(producerId)) {
            producerPeer = p;
            break;
          }
        }
        const producer = producerPeer?.producers.get(producerId);
        if (!room || !transport || !producer) {
          console.warn(
            `[${socket.id}] Tried to consume without valid room/transport/producer`
          );
          return;
        }
        if (!room.router.canConsume({ producerId, rtpCapabilities })) {
          console.warn(`[${socket.id}] Cannot consume producer ${producerId}`);
          return callback({ error: "Cannot consume" });
        }
        const consumer = await transport.consume({
          producerId,
          rtpCapabilities,
          paused: false,
        });
        peer.consumers.set(consumer.id, consumer);
        console.log(
          `[${socket.id}] consume: ${consumer.id} (from producer ${producerId})`
        );
        callback({
          id: consumer.id,
          producerId,
          kind: consumer.kind,
          rtpParameters: consumer.rtpParameters,
        });
      }
    );

    socket.on("disconnect", (reason) => {
      const room = getRoom(currentRoomId);
      const peer = room?.peers.get(socket.id);
      if (!room || !peer) return;
      console.log(`[${socket.id}] disconnected, cleaning up resources`);
      // ...en socket.on("disconnect") y leaveRoom...
      peer.producers.forEach((p, producerId) => {
        socket.to(currentRoomId).emit("producerClosed", { producerId });
        p.close();
      });
      peer.transports.forEach((t) => t.close());
      peer.producers.forEach((p) => p.close());
      peer.consumers.forEach((c) => c.close());
      room.peers.delete(socket.id);
      console.log(`Socket desconectado: ${socket.id} - Motivo: ${reason}`);
    });
  });
}
