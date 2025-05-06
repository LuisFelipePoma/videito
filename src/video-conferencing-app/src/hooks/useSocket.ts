import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (roomId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL || '', {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      setConnected(true);
      newSocket.emit('joinRoom', { roomId });
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  return { socket, connected };
};

export default useSocket;