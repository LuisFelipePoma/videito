import React, { useContext } from 'react';
import { RoomContext } from '../../context/RoomContext';
import Participant from './Participant';

const ParticipantsList: React.FC = () => {
  const { participants } = useContext(RoomContext);

  return (
    <div className="participants-list">
      <h2 className="text-lg font-semibold">Participants</h2>
      <ul className="list-none p-0">
        {participants.map(participant => (
          <li key={participant.id} className="py-2">
            <Participant participant={participant} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantsList;