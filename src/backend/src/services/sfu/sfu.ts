import { Server as HttpServer } from "http";
import * as mediasoup from "mediasoup";

let worker: mediasoup.types.Worker;
const rooms = new Map();

export const initializeMediaSoup = async (httpServer: HttpServer) => {
  try {
    // Crear worker
    worker = await mediasoup.createWorker({
      logLevel: "warn",
      rtcMinPort: 10000,
      rtcMaxPort: 10100,
    });

    console.log("MediaSoup worker created");

    worker.on("died", () => {
      console.error("MediaSoup worker died, exiting...");
      process.exit(1);
    });

    // Configurar eventos de Socket.IO para señalización WebRTC
    // const io = getIO();

    // io.on("connection", (socket) => {
    //   socket.on("createRoom", async (roomId) => {
    //     await createRoom(roomId);
    //     socket.emit("roomCreated", { roomId });
    //   });

    //   socket.on("joinRoom", async (data) => {
    //     const { roomId, userId } = data;
    //     await joinRoom(roomId, socket.id, userId);
    //   });

    // Otros eventos de señalización...
    // });

    return worker;
  } catch (error) {
    console.error("Failed to initialize MediaSoup:", error);
    process.exit(1);
  }
};

// Crear una sala de MediaSoup
async function createRoom(roomId: string) {
  if (rooms.has(roomId)) {
    return rooms.get(roomId);
  }

  const mediaCodecs: mediasoup.types.RtpCodecCapability[] = [
    {
      kind: "audio" as mediasoup.types.MediaKind,
      mimeType: "audio/opus",
      clockRate: 48000,
      channels: 2,
    },
    {
      kind: "video" as mediasoup.types.MediaKind,
      mimeType: "video/VP8",
      clockRate: 90000,
      parameters: {
        "x-google-start-bitrate": 1000,
      },
    },
  ];

  const router = await worker.createRouter({ mediaCodecs });

  rooms.set(roomId, {
    router,
    peers: new Map(),
    transports: new Map(),
    producers: new Map(),
    consumers: new Map(),
  });

  return rooms.get(roomId);
}
