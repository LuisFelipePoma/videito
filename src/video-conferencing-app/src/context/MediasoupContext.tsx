import React, { createContext, useContext, useEffect, useState } from 'react';
import { createSocket } from '../services/socket';
import { initMediasoup } from '../services/mediasoup';

const MediasoupContext = createContext(null);

export const MediasoupProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [mediasoup, setMediasoup] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      const newSocket = createSocket();
      setSocket(newSocket);
      const mediasoupInstance = await initMediasoup();
      setMediasoup(mediasoupInstance);
    };

    initialize();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <MediasoupContext.Provider value={{ socket, mediasoup }}>
      {children}
    </MediasoupContext.Provider>
  );
};

export const useMediasoup = () => {
  const context = useContext(MediasoupContext);
  if (!context) {
    throw new Error('useMediasoup must be used within a MediasoupProvider');
  }
  return context;
};