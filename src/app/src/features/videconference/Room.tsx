import { VideoRoom } from "@components/VideoRoom";
import { useParams } from "react-router";

export const Room = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="h-full w-full">
      <VideoRoom roomId={String(id)} />
    </div>
  );
};
