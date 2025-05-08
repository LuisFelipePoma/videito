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
      if (!device || !socket) return;
      const transportParams = await createTransport(false);

      // 3. Crear producerTransport en el cliente
      const producerTransport = device.createSendTransport(transportParams);

      // 4. Cuando el transport necesite conectarse, llama a connectTransport
      producerTransport.on(
        "connect",
        async ({ dtlsParameters }, callback, errback) => {
          try {
            await connectTransport(producerTransport.id, dtlsParameters);
            console.log("[frontend] Transport connected");
            callback();
          } catch (err: any) {
            console.error("Connection error:", err);
            errback(err);
          }
        }
      );

      producerTransport.on(
        "produce",
        async ({ kind, rtpParameters, appData }, callback, errback) => {
          try {
            // Llama al backend para crear el producer
            socket.emit(
              "produceTransport",
              { kind, rtpParameters, appData: producerTransport.id },
              (response: any) => {
                if (response && response.id) {
                  callback({ id: response.id });
                } else {
                  errback(response?.error || "Produce error");
                }
              }
            );
          } catch (err) {
            errback(err);
          }
        }
      );

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      const track = stream.getVideoTracks()[0]; // o audio
      const producer = await producerTransport.produce({ track });
    };

    setup();
  }, [createTransport, connectTransport, device]);

  return (
    <div className="room-page">
      <div>Room: {id}</div>
    </div>
  );
};
