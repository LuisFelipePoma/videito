import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';
import { useMediasoup } from './useMediasoup';

export const useRoom = (roomId: string) => {
  const { socket } = useSocket();
  const { createProducer, createConsumer } = useMediasoup();
  const [participants, setParticipants] = useState<string[]>([]);

  useEffect(() => {
    socket.emit('joinRoom', { roomId });

    socket.on('existingProducers', (producerIds: string[]) => {
      producerIds.forEach((producerId) => {
        createConsumer(producerId);
      });
    });

    socket.on('newProducer', ({ producerId }) => {
      createConsumer(producerId);
    });

    return () => {
      socket.off('existingProducers');
      socket.off('newProducer');
    };
  }, [socket, roomId, createConsumer]);

  return { participants, setParticipants };
};