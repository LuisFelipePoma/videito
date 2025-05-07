import { useEffect } from "react";
import { useSocket } from "./context/useSocket";
import { useParams } from "react-router";
import { useRoomSocket } from "./hooks/useRoomSocket";
import * as mediasoupClient from "mediasoup-client";

export const Room = () => {
  const { id } = useParams();
  const socket = useSocket();
  const { createTransport, connectTransport } = useRoomSocket(socket, id || "");

  useEffect(() => {
    let device: mediasoupClient.Device;
    let sendTransport: mediasoupClient.types.Transport;

    const setup = async () => {
      // 1. Crear transport en backend
      const transportParams = await createTransport();
      console.log("[frontend] Transport params:", transportParams);
      // 2. Crear device de mediasoup-client si no existe
      device = new mediasoupClient.Device();
      // (deberías obtener rtpCapabilities del backend y cargar aquí)
      await device.load({ routerRtpCapabilities });

      // 3. Crear sendTransport en el cliente
      sendTransport = device.createSendTransport(transportParams);

      // 4. Cuando el transport necesite conectarse, llama a connectTransport
      sendTransport.on(
        "connect",
        async ({ dtlsParameters }, callback, errback) => {
          try {
            await connectTransport(dtlsParameters);
            callback();
          } catch (err) {
            errback(err);
          }
        }
      );

      // 5. (Opcional) produce audio/video aquí
      // const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      // const track = stream.getVideoTracks()[0];
      // await sendTransport.produce({ track });
    };

    setup();
  }, [createTransport, connectTransport]);

  return (
    <div className="room-page">
      <div>Room: {id}</div>
    </div>
  );
};
