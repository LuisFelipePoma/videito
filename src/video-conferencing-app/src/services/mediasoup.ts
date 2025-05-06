import { Worker, Router, RtpCodecCapability } from "mediasoup/node/lib/types";
import * as mediasoup from 'mediasoup';

const workers: Worker[] = [];
let nextWorkerIndex = 0;

// Mapa roomId → Router
export const routers: Map<string, Router> = new Map();

export async function createWorker(): Promise<Worker> {
  const worker = await mediasoup.createWorker({
    rtcMinPort: 10000,
    rtcMaxPort: 10100,
    logLevel: "warn",
    logTags: ["ice", "dtls", "rtp", "srtp", "rtcp"],
  });

  worker.on("died", () => {
    console.error("mediasoup Worker died, exiting in 2 seconds…");
    setTimeout(() => process.exit(1), 2000);
  });

  workers.push(worker);
  return worker;
}

export async function getOrCreateRouter(roomId: string): Promise<Router> {
  if (routers.has(roomId)) {
    return routers.get(roomId)!;
  }
  // Round-robin entre workers (si hay varios)
  const worker = workers[nextWorkerIndex];
  nextWorkerIndex = (nextWorkerIndex + 1) % workers.length;
  const mediaCodecs: RtpCodecCapability[] = [
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
      parameters: {},
    },
  ];
  const router = await worker.createRouter({ mediaCodecs });
  routers.set(roomId, router);
  return router;
}

// Función para inicializar todos los workers al arrancar la app
export async function initMediaSoup(): Promise<void> {
  // Por ejemplo, creamos un solo worker. Puedes aumentar según tu CPU.
  await createWorker();
}