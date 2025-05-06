import React from 'react';

interface ParticipantProps {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoEnabled: boolean;
}

const Participant: React.FC<ParticipantProps> = ({ id, name, isMuted, isVideoEnabled }) => {
  return (
    <div className="participant">
      <div className={`video ${isVideoEnabled ? 'enabled' : 'disabled'}`}>
        {/* Video stream would be rendered here */}
      </div>
      <div className="info">
        <span className="name">{name}</span>
        {isMuted && <span className="muted">Muted</span>}
      </div>
    </div>
  );
};

export default Participant;