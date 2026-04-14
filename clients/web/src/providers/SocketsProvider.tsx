import { SocketContext, type AppSockets } from '@/contexts/SocketContext';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL as string;

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketsRef = useRef<AppSockets | null>(null);
  const [contextValue, setContextValue] = useState<AppSockets | null>(null);

  useEffect(() => {
    if (socketsRef.current) return;

    const common = {
      transports: ['websocket'],
      withCredentials: true,
    };

    const notifications = io(`${API_URL}/notifications`, common);
    const chats = io(`${API_URL}/chat`, common);

    const sockets: AppSockets = { notifications, chats };
    socketsRef.current = sockets;
    setContextValue(sockets);

    return () => {
      notifications.disconnect();
      chats.disconnect();
      socketsRef.current = null;
      setContextValue(null);
    };
  }, []);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}
