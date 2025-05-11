// ...existing code...
import { useParams } from "react-router";
import { useLocalMedia } from "./hooks/useLocalMedia";
import { useMediasoupConnection } from "./hooks/useMediasoupConnection";

export const Room = () => {
  const { id } = useParams();
  useMediasoupConnection();
  const { stream, loading, error } = useLocalMedia({
    video:{
      facingMode: "user",
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
    audio: true,
  });

  return (
    <div className="room-page">
      <div>Room: {id}</div>
      {loading && <div>Cargando cámara...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {stream && (
        <>
          <video
            autoPlay
            muted
            playsInline
            ref={(video) => {
              if (video && stream) video.srcObject = stream;
            }}
            style={{ width: 320, height: 240, background: "#000" }}
          />
        </>
      )}
    </div>
  );
};
