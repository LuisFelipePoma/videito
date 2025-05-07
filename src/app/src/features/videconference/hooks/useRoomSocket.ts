/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransportOptions } from "mediasoup-client/types";
import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

export function useRoomSocket(socket: Socket | null, roomId: string) {
  // Referencia para exponer funciones
  const apiRef = useRef({
    createTransport: async (): Promise<TransportOptions | any> => {},
    connectTransport: async (_dtlsParameters: any): Promise<void> => {},
  });

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit("joinRoom", { roomId });
    const onJoinedRoom = ({ roomId }: { roomId: string }) => {
      console.log(`[frontend] Joined room: ${roomId}`);
    };
    socket.on("joinedRoom", onJoinedRoom);

    // Implementación de createTransport
    apiRef.current.createTransport = async () => {
      return new Promise((resolve, reject) => {
        socket.emit("createTransport", {}, (params: any) => {
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
    apiRef.current.connectTransport = async (dtlsParameters: any) => {
      return new Promise<void>((resolve, reject) => {
        socket.emit("connectTransport", { dtlsParameters }, (response: any) => {
          if (response && response.error) {
            console.warn("[frontend] connectTransport error", response.error);
            reject(response.error);
          } else {
            console.log("[frontend] connectTransport OK");
            resolve();
          }
        });
      });
    };

    return () => {
      socket.off("joinedRoom", onJoinedRoom);
    };
  }, [socket, roomId]);

  // Devuelve las funciones para usarlas en el componente
  return apiRef.current;
}
