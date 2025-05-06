import React from 'react';
import { useRoom } from '../../hooks/useRoom';
import { IconButton } from '../common/IconButton';

const MediaControls: React.FC = () => {
  const { isAudioEnabled, isVideoEnabled, toggleAudio, toggleVideo } = useRoom();

  return (
    <div className="flex space-x-4">
      <IconButton
        onClick={toggleAudio}
        icon={isAudioEnabled ? 'mic' : 'mic-off'}
        aria-label={isAudioEnabled ? 'Mute' : 'Unmute'}
      />
      <IconButton
        onClick={toggleVideo}
        icon={isVideoEnabled ? 'videocam' : 'videocam-off'}
        aria-label={isVideoEnabled ? 'Stop Video' : 'Start Video'}
      />
    </div>
  );
};

export default MediaControls;