// services/rooms/socket.ts
import { Server as IOServer, Socket } from "socket.io";
import { getOrCreateRouter } from "./mediasoup";
import { WebRtcTransport, Producer } from "mediasoup/node/lib/types";

interface RoomState {
  producers: Map<string, Producer>; // producerId → Producer
}
const rooms: Map<string, RoomState> = new Map();

export function initSocket(io: IOServer) {
  io.on("connection", (socket: Socket) => {
    console.log(`📶 Socket connected: ${socket.id}`);

    socket.on("joinRoom", async ({ roomId }: { roomId: string }) => {
      socket.join(roomId);
      if (!rooms.has(roomId)) {
        rooms.set(roomId, { producers: new Map() });
      }
      const state = rooms.get(roomId)!;

      // Devuelve lista de producers existentes para que el cliente cree consumidores
      socket.emit("existingProducers", Array.from(state.producers.keys()));
    });

    // Cliente solicita crear un transport para enviar (produce)
    socket.on("createProducerTransport", async ({ roomId }, callback) => {
      const router = await getOrCreateRouter(roomId);
      const transport = (await router.createWebRtcTransport({
        listenIps: [{ ip: "0.0.0.0", announcedIp: process.env.ANNOUNCED_IP }],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
      })) as WebRtcTransport;

      // Guardamos el transport en el socket para usarlo luego
      (socket.data as any).producerTransport = transport;

      callback({
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      });
    });

    socket.on(
      "connectProducerTransport",
      async ({ dtlsParameters }, callback) => {
        const transport = (socket.data as any)
          .producerTransport as WebRtcTransport;
        await transport.connect({ dtlsParameters });
        callback({ connected: true });
      }
    );

    socket.on("produce", async ({ kind, rtpParameters, roomId }, callback) => {
      const transport = (socket.data as any)
        .producerTransport as WebRtcTransport;
      const producer = await transport.produce({ kind, rtpParameters });
      const state = rooms.get(roomId)!;
      state.producers.set(producer.id, producer);

      // Notificar a otros peers que hay un nuevo producer
      socket.to(roomId).emit("newProducer", { producerId: producer.id });
      callback({ id: producer.id });
    });

    // Cliente solicita consumir un producer
    socket.on("createConsumerTransport", async ({ roomId }, callback) => {
      const router = await getOrCreateRouter(roomId);
      const transport = (await router.createWebRtcTransport({
        listenIps: [{ ip: "0.0.0.0", announcedIp: process.env.ANNOUNCED_IP }],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
      })) as WebRtcTransport;

      (socket.data as any).consumerTransport = transport;
      callback({
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      });
    });

    socket.on(
      "connectConsumerTransport",
      async ({ dtlsParameters }, callback) => {
        const transport = (socket.data as any)
          .consumerTransport as WebRtcTransport;
        await transport.connect({ dtlsParameters });
        callback({ connected: true });
      }
    );

    socket.on("consume", async ({ producerId, roomId }, callback) => {
      const router = await getOrCreateRouter(roomId);
      const state = rooms.get(roomId)!;
      const producer = state.producers.get(producerId)!;

      const transport = (socket.data as any)
        .consumerTransport as WebRtcTransport;
      const { rtpCapabilities } = socket.handshake.query as any;
      // Verificar si el router puede consumir ese producer
      if (!router.canConsume({ producerId, rtpCapabilities })) {
        return callback({ error: "Cannot consume" });
      }
      const consumer = await transport.consume({
        producerId,
        rtpCapabilities,
        paused: false,
      });

      callback({
        id: consumer.id,
        producerId,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters,
      });
    });

    socket.on("disconnect", () => {
      console.log(`❌ Socket disconnected: ${socket.id}`);
      // Aquí podrías limpiar producers o transports asociados
    });
  });
}
