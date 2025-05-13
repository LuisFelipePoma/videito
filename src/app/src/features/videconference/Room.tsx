import { useParams } from "react-router";
import { useLocalMedia } from "./hooks/useLocalMedia";
import { useMediasoupConnection } from "./hooks/useMediasoupConnection";

export const Room = () => {
  const { id } = useParams();
  const { remoteStreams } = useRoomStore(
    useShallow((s) => ({
      remoteStreams: s.remoteStreams,
    }))
  );


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


// {remoteStreams.map((stream, i) => (
//   <video
//     key={i}
//     autoPlay
//     playsInline
//     ref={(video) => {
//       if (video) video.srcObject = stream;
//     }}
//     style={{ width: 320, height: 240, background: "#000", margin: 10 }}
//   />
// ))}
