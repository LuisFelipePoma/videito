import { useParams } from "react-router";
import { useMediasoupConnection } from "./hooks/useMediasoupConnection";
import { RoomLayout } from "./layouts/RoomLayout";

export const Room = () => {
  const { id } = useParams();
  useMediasoupConnection();
  return (
    <RoomLayout
      roomName={`Sala: ${id}`}
    />
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
