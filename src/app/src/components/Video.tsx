import { useEffect, useRef } from "react";

interface Props {
  stream: MediaStream;
  muted?: boolean;
}
export const Video: React.FC<Props> = ({ stream, muted }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      muted={muted}
      className="w-full h-full object-cover rounded shadow"
    />
  );
};
