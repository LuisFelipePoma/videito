import React, { useContext, useEffect } from 'react';
import { MediasoupContext } from '../../context/MediasoupContext';
import { RoomContext } from '../../context/RoomContext';
import MediaControls from './MediaControls';
import ParticipantsList from './ParticipantsList';
import VideoGrid from './VideoGrid';

const Room: React.FC = () => {
  const { roomId } = useContext(RoomContext);
  const { initMediasoup, joinRoom } = useContext(MediasoupContext);

  useEffect(() => {
    const setupRoom = async () => {
      await initMediasoup();
      await joinRoom(roomId);
    };

    setupRoom();

    return () => {
      // Cleanup logic if necessary
    };
  }, [initMediasoup, joinRoom, roomId]);

  return (
    <div className="flex flex-col h-full">
      <VideoGrid />
      <ParticipantsList />
      <MediaControls />
    </div>
  );
};

export default Room;