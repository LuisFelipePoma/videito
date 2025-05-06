import { useParams } from "react-router";

const Room = () => {
  const { id } = useParams();

  return <div className="room-page">pepe {id}</div>;
};

export default Room;
