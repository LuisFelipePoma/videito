/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DtlsParameters,
  RtpCapabilities,
  TransportOptions,
} from "mediasoup-client/types";
import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { useRoomStore } from "../store/useRoomStore";
import { useShallow } from "zustand/react/shallow";

export function useRoomSocket(socket: Socket | null, roomId: string) {
  const { setRtpCapabilities } = useRoomStore(
    useShallow((s) => ({
      setRtpCapabilities: s.setRtpCapabilities,
    }))
  );
  // Referencia para exponer funciones
  const apiRef = useRef({
    createTransport: async (isConsumer): Promise<TransportOptions | any> => {},
    connectTransport: async (
      transportId: string,
      _dtlsParameters: DtlsParameters
    ): Promise<void> => {},
  });

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit("joinRoom", { roomId });

    const onJoinedRoom = ({
      rtpCapabilities,
      producerList,
    }: {
      rtpCapabilities: RtpCapabilities;
      producerList: string[];
    }) => {
      console.log({ rtpCapabilities });
      console.log({ producerList });
      setRtpCapabilities(rtpCapabilities);
    };

    socket.on("joinedRoom", onJoinedRoom);

    // Implementación de createTransport
    apiRef.current.createTransport = async (isConsumer) => {
      return new Promise((resolve, reject) => {
        socket.emit("createTransport", { isConsumer }, (params: any) => {
          if (!params || !params.id) {
            console.warn("[frontend] createTransport error", params);
            reject(params);
          } else {
            console.log("[frontend] createTransport", params);
            resolve(params);
          }
        });
      });
    };

    // Implementación de connectTransport
    apiRef.current.connectTransport = async (
      transportId,
      dtlsParameters: any
    ) => {
      return new Promise<void>((resolve, reject) => {
        socket.emit(
          "connectTransport",
          { transportId, dtlsParameters },
          (response: any) => {
            if (response && response.error) {
              console.warn("[frontend] connectTransport error", response.error);
              reject(response.error);
            } else {
              console.log("[frontend] connectTransport OK");
              resolve();
            }
          }
        );
      });
    };

    return () => {
      socket.off("joinedRoom", onJoinedRoom);
    };
  }, [socket, roomId]);

  // Devuelve las funciones para usarlas en el componente
  return apiRef.current;
}
