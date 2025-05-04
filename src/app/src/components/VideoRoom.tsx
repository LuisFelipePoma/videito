import { useEffect, useRef } from "react";
import Peer, { MediaConnection } from "peerjs";
import io from "socket.io-client";
import { Video } from "./Video";
import { useRoomStore } from "@core/context/roomStore";
import { useShallow } from "zustand/shallow";

// const socket = io("http://localhost:3000");
const socket = io("https://4bbptgkr-3000.brs.devtunnels.ms");

export const VideoRoom = ({ roomId }: { roomId: string }) => {
  const { streams = [], setStreams } = useRoomStore(
    useShallow((s) => ({
      streams: s.streams,
      setStreams: s.setStreams,
    }))
  );
  const peersRef = useRef<Record<string, MediaConnection>>({});
  const myPeerRef = useRef(
    new Peer("PEPEPATOPATO", {
      host: "4bbptgkr-3001.brs.devtunnels.ms", // sin https://
      port: 443, // devtunnels usa 443 para HTTPS
      path: "/peerjs", // asegúrate que tu servidor PeerJS use este path
      secure: true,
      //   host: "/",
      //   port: 3001,
    })
  );
  const myStreamRef = useRef<MediaStream>(null);

  useEffect(() => {
    if (
      !navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== "function"
    ) {
      alert(
        "Tu navegador no soporta acceso a la cámara/micrófono. Usa Chrome, Safari o Firefox y asegúrate de estar en HTTPS."
      );
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        myStreamRef.current = stream;
        setStreams((prev) => [...prev, { id: "me", stream, muted: true }]);

        myPeerRef.current.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (userVideoStream) => {
            addPeerStream(call.peer, userVideoStream);
          });
        });

        socket.on("user-connected", (userId) => {
          console.log("User connected", userId);
          connectToNewUser(userId, stream);
        });

        // Nueva lógica: cuando alguien pide los usuarios existentes, responde con tu stream
        socket.on("request-users", (userId) => {
          if (userId !== myPeerRef.current.id) {
            connectToNewUser(userId, stream);
          }
        });

        // Cuando te unes, pide a los demás usuarios que te envíen su stream
        socket.emit("request-users", myPeerRef.current.id);
      })
      .catch((err) => {
        console.error("Error al obtener media stream:", err);
        alert("No se pudo acceder a la cámara/micrófono: " + err.message);
      });

    socket.on("user-disconnected", (userId) => {
      if (peersRef.current[userId]) peersRef.current[userId].close();
      setStreams((prev) => prev.filter((s) => s.id !== userId));
    });

    myPeerRef.current.on("open", (id) => {
      socket.emit("join-room", roomId, id);
    });

    function connectToNewUser(userId: string, stream: MediaStream) {
      const call = myPeerRef.current.call(userId, stream);
      call.on("stream", (userVideoStream) => {
        addPeerStream(userId, userVideoStream);
      });
      call.on("close", () => {
        setStreams((prev) => prev.filter((s) => s.id !== userId));
      });
      peersRef.current[userId] = call;
    }

    function addPeerStream(userId: string, stream: MediaStream) {
      setStreams((prev) => {
        if (prev.some((s) => s.id === userId)) return prev;
        return [...prev, { id: userId, stream, muted: false }];
      });
    }

    // Cleanup on unmount
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(peersRef.current).forEach((peer) => peer.close());
      socket.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      myPeerRef.current.destroy();
      myStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [roomId, setStreams]);

  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] auto-rows-[300px] gap-4 p-4 bg-gray-900 min-h-screen"
      id="video-grid"
    >
      {streams.map(({ id, stream, muted }) => (
        <Video key={`video-${id}`} stream={stream} muted={muted} />
      ))}
    </div>
  );
};
