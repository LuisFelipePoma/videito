import { useEffect } from "react";
import { useRoomSocket } from "../hooks/useRoomSocket";
import { useRoomStore } from "../store/useRoomStore";
import { useSocket } from "../context/useSocket";
import { useParams } from "react-router";
import { useShallow } from "zustand/react/shallow";

export const useMediasoupConnection = () => {
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
      if (!device || !socket) return;
      const transportParams = await createTransport(false);
      const producerTransport = device.createSendTransport(transportParams);

      producerTransport.on(
        "connect",
        async ({ dtlsParameters }, callback, errback) => {
          try {
            await connectTransport(producerTransport.id, dtlsParameters);
            callback();
          } catch (err: any) {
            errback(err);
          }
        }
      );

      producerTransport.on(
        "produce",
        async ({ kind, rtpParameters, appData }, callback, errback) => {
          try {
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
      const track = stream.getVideoTracks()[0];
      await producerTransport.produce({ track });
    };

    setup();
  }, [createTransport, connectTransport, device, socket, id]);
};