import { useEffect, useState, useContext } from 'react';
import { MediasoupContext } from '../context/MediasoupContext';
import { RoomContext } from '../context/RoomContext';

const useProducer = () => {
  const { createProducerTransport, produce } = useContext(MediasoupContext);
  const { roomId } = useContext(RoomContext);
  const [producer, setProducer] = useState(null);

  useEffect(() => {
    const initProducer = async () => {
      const transport = await createProducerTransport(roomId);
      const newProducer = await produce(transport);
      setProducer(newProducer);
    };

    initProducer();

    return () => {
      if (producer) {
        producer.close();
      }
    };
  }, [createProducerTransport, produce, roomId, producer]);

  return { producer };
};

export default useProducer;