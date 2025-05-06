import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MediasoupContext } from '../context/MediasoupContext';
import { RoomContext } from '../context/RoomContext';
import MediaControls from '../components/room/MediaControls';
import ParticipantsList from '../components/room/ParticipantsList';
import VideoGrid from '../components/room/VideoGrid';

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { joinRoom, leaveRoom } = useContext(RoomContext);
  const { initializeMediasoup } = useContext(MediasoupContext);

  useEffect(() => {
    if (roomId) {
      initializeMediasoup();
      joinRoom(roomId);
    }

    return () => {
      leaveRoom();
    };
  }, [roomId, joinRoom, leaveRoom, initializeMediasoup]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
        <VideoGrid />
      </div>
      <ParticipantsList />
      <MediaControls />
    </div>
  );
};

export default RoomPage;