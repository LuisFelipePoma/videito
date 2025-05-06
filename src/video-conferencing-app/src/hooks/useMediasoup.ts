import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';
import { useProducer } from './useProducer';
import { useConsumer } from './useConsumer';

const useMediasoup = (roomId) => {
  const socket = useSocket();
  const { createProducer } = useProducer();
  const { createConsumer } = useConsumer();
  const [producers, setProducers] = useState(new Map());

  useEffect(() => {
    if (!socket) return;

    socket.emit('joinRoom', { roomId });

    socket.on('existingProducers', (producerIds) => {
      producerIds.forEach((producerId) => {
        createConsumer(producerId, roomId);
      });
    });

    socket.on('newProducer', ({ producerId }) => {
      createConsumer(producerId, roomId);
    });

    return () => {
      socket.off('existingProducers');
      socket.off('newProducer');
    };
  }, [socket, roomId, createConsumer]);

  const addProducer = (producer) => {
    setProducers((prev) => new Map(prev).set(producer.id, producer));
  };

  return { producers, createProducer: (kind, rtpParameters) => createProducer(kind, rtpParameters, addProducer) };
};

export default useMediasoup;