import {
  WebRtcTransport,
  Producer,
  Consumer,
  Router,
  Worker,
} from "mediasoup/node/lib/types";
import * as mediasoup from "mediasoup";

type Room = {
  router: Router;
  transports: Map<string, WebRtcTransport>;
  producers: Map<string, Producer>;
  consumers: Map<string, Consumer>;
};

const rooms: Map<string, Room> = new Map();
let worker: Worker<mediasoup.types.AppData>;
export async function initMediasoup() {
  worker = await mediasoup.createWorker({
    rtcMinPort: 40000,
    rtcMaxPort: 49999,
  });
  worker.on("died", (error) => {
    // This implies something serious happened, so kill the application
    console.error("mediasoup worker has died");
    setTimeout(() => process.exit(1), 2000); // exit in 2 seconds
  });

  return worker;
}

export async function createRoom(roomId: string) {
  if (rooms.has(roomId)) return rooms.get(roomId);
  const router = await worker.createRouter({
    mediaCodecs: [
      {
        kind: "audio",
        mimeType: "audio/opus",
        clockRate: 48000,
        channels: 2,
      },
      {
        kind: "video",
        mimeType: "video/VP8",
        clockRate: 90000,
      },
    ],
  });
  const room: Room = {
    router,
    transports: new Map(),
    producers: new Map(),
    consumers: new Map(),
  };
  rooms.set(roomId, room);
  return room;
}

export function getRoom(roomId: string) {
  return rooms.get(roomId);
}

export async function createWebRtcTransport(room: Room) {
  const transport = await room.router.createWebRtcTransport({
    listenIps: [{ ip: "0.0.0.0", announcedIp: undefined }],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
  });
  return transport;
}
