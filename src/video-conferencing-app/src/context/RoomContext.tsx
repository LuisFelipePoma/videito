import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { Participant } from '../types/room';

interface RoomContextType {
  participants: Participant[];
  addParticipant: (participant: Participant) => void;
  removeParticipant: (participantId: string) => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on('newParticipant', (participant: Participant) => {
      setParticipants((prev) => [...prev, participant]);
    });

    socket.on('participantLeft', (participantId: string) => {
      setParticipants((prev) => prev.filter(p => p.id !== participantId));
    });

    return () => {
      socket.off('newParticipant');
      socket.off('participantLeft');
    };
  }, [socket]);

  const addParticipant = (participant: Participant) => {
    setParticipants((prev) => [...prev, participant]);
  };

  const removeParticipant = (participantId: string) => {
    setParticipants((prev) => prev.filter(p => p.id !== participantId));
  };

  return (
    <RoomContext.Provider value={{ participants, addParticipant, removeParticipant }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = (): RoomContextType => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};