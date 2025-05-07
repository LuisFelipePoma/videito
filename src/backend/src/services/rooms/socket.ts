import { Server, Socket } from "socket.io";
import {
  initMediasoup,
  createRoom,
  getRoom,
  createWebRtcTransport,
} from "./mediasoup";

export async function setupSocketServer(io: Server) {
  await initMediasoup();
  console.log("Mediasoup worker initialized");
  io.on("connection", (socket: Socket) => {
    let currentRoomId: string;
    console.log(`Socket connected: ${socket.id}`);

    socket.on("joinRoom", async ({ roomId }) => {
      currentRoomId = roomId;
      console.log(`[${socket.id}] joinRoom: ${roomId}`);
      await createRoom(roomId);
      socket.join(roomId);
      socket.emit("joinedRoom", { roomId });
    });

    socket.on("createTransport", async (_, callback) => {
      const room = getRoom(currentRoomId);
      if (!room) {
        console.warn(`[${socket.id}] Tried to createTransport without room`);
        return;
      }
      const transport = await createWebRtcTransport(room);
      room.transports.set(socket.id, transport);
      console.log(`[${socket.id}] createTransport: ${transport.id}`);
      callback({
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      });
    });

    socket.on("connectTransport", async ({ dtlsParameters }, callback) => {
      const room = getRoom(currentRoomId);
      const transport = room?.transports.get(socket.id);
      if (!transport) {
        console.warn(
          `[${socket.id}] Tried to connectTransport without transport`
        );
        return;
      }
      await transport.connect({ dtlsParameters });
      console.log(`[${socket.id}] connectTransport`);
      callback();
    });

    socket.on("produce", async ({ kind, rtpParameters }, callback) => {
      const room = getRoom(currentRoomId);
      const transport = room?.transports.get(socket.id);
      if (!transport) {
        console.warn(`[${socket.id}] Tried to produce without transport`);
        return;
      }
      const producer = await transport.produce({ kind, rtpParameters });
      if (!room) return;
      room.producers.set(socket.id, producer);
      console.log(`[${socket.id}] produce: ${producer.id} (${kind})`);
      callback({ id: producer.id });
      socket.to(currentRoomId).emit("newProducer", { producerId: producer.id });
    });

    socket.on("consume", async ({ producerId, rtpCapabilities }, callback) => {
      const room = getRoom(currentRoomId);
      const transport = room?.transports.get(socket.id);
      const producer = room?.producers.get(producerId);
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
      room.consumers.set(socket.id, consumer);
      console.log(
        `[${socket.id}] consume: ${consumer.id} (from producer ${producerId})`
      );
      callback({
        id: consumer.id,
        producerId,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters,
      });
    });

    socket.on("disconnect", () => {
      const room = getRoom(currentRoomId);
      if (!room) return;
      console.log(`[${socket.id}] disconnected, cleaning up resources`);
      room.transports.get(socket.id)?.close();
      room.producers.get(socket.id)?.close();
      room.consumers.get(socket.id)?.close();
      room.transports.delete(socket.id);
      room.producers.delete(socket.id);
      room.consumers.delete(socket.id);
    });
  });
}
