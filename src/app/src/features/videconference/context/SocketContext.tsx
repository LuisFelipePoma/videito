import React, { createContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext<Socket | null>(null);

interface Props {
  children: React.ReactNode;
  url: string;
}
export const SocketProvider: React.FC<Props> = ({ children, url }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log("Connecting to socket server at:", url);
    const newSocket = io(url);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [url]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
