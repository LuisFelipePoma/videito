import { useEffect, useState } from 'react';
import { useMediasoup } from './useMediasoup';
import { useSocket } from './useSocket';
import { Consumer } from '../types/mediasoup';

export const useConsumer = (producerId: string, roomId: string) => {
  const { socket } = useSocket();
  const { rtpCapabilities } = useMediasoup();
  const [consumer, setConsumer] = useState<Consumer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleConsume = async () => {
      try {
        const { id, producerId, kind, rtpParameters } = await socket.request('consume', { producerId, roomId });
        const newConsumer = await socket.createConsumer({ id, producerId, kind, rtpParameters });
        setConsumer(newConsumer);
      } catch (err) {
        setError('Failed to consume media');
      }
    };

    if (socket) {
      handleConsume();
    }

    return () => {
      if (consumer) {
        consumer.close();
      }
    };
  }, [socket, producerId, roomId]);

  return { consumer, error };
};