import React from 'react';
import { useRoom } from '../../hooks/useRoom';
import Participant from './Participant';

const VideoGrid: React.FC = () => {
  const { participants } = useRoom();

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {participants.map(participant => (
        <Participant key={participant.id} participant={participant} />
      ))}
    </div>
  );
};

export default VideoGrid;