/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useSocket } from "./context/useSocket";
import { useParams } from "react-router";
import { useRoomSocket } from "./hooks/useRoomSocket";
import { useRoomStore } from "./store/useRoomStore";
import { useShallow } from "zustand/react/shallow";

export const Room = () => {
  const { id } = useParams();
  const socket = useSocket();
  const { createTransport, connectTransport } = useRoomSocket(socket, id || "");
  const { device } = useRoomStore(
    useShallow((s) => ({
      device: s.device,
    }))
  );

  useEffect(() => {
    const setup = async () => {
      // 1. Crear transport en backend
      if (!device) return;
      const transportParams = await createTransport();
      console.log("[frontend] Transport params:", transportParams);
      // 2. Crear device de mediasoup-client si no existe
      // (deberías obtener rtpCapabilities del backend y cargar aquí)

      // 3. Crear producerTransport en el cliente
      const producerTransport = device.createSendTransport(transportParams);

      // 4. Cuando el transport necesite conectarse, llama a connectTransport
      producerTransport.on(
        "connect",
        async ({ dtlsParameters }, callback, errback) => {
          try {
            await connectTransport(dtlsParameters);
            console.log("[frontend] Transport connected");
            callback();
          } catch (err: any) {
            console.error("Connection error:", err);
            errback(err);
          }
        }
      );

      // connectSendTransport();
      // 5. (Opcional) produce audio/video aquí
      // const stream = await navigator.mediaDevices.getUserMedia({
      //   audio: true,
      //   video: true,
      // });
      // const track = stream.getVideoTracks()[0];
      // await sendTransport.produce({ track });
    };

    setup();
  }, [createTransport, connectTransport, device]);

  return (
    <div className="room-page">
      <div>Room: {id}</div>
    </div>
  );
};
