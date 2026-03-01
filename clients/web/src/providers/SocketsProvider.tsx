import { SocketContext, type AppSockets } from '@/contexts/SocketContext';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL as string;
export function SocketProvider({
  jwt,
  children,
}: {
  jwt: string | null;
  children: React.ReactNode;
}) {
  const socketsRef = useRef<AppSockets | null>(null);
  const tokenRef = useRef<string | null>(null);

  // This is the value used for rendering (and context)
  const [contextValue, setContextValue] = useState<AppSockets | null>(null);

  useEffect(() => {
    // Logout: disconnect and clear
    if (!jwt) {
      socketsRef.current?.notifications.disconnect();
      socketsRef.current?.chats.disconnect();
      socketsRef.current = null;
      tokenRef.current = null;
      return;
    }

    // If we already have sockets for this token, ensure context is set and do nothing
    if (socketsRef.current && tokenRef.current === jwt) {
      // If contextValue is null for some reason, restore it
      setContextValue(socketsRef.current);
      return;
    }

    // Token changed or first login: recreate sockets
    socketsRef.current?.notifications.disconnect();
    socketsRef.current?.chats.disconnect();

    const common = {
      transports: ['websocket'],
      withCredentials: true,
      auth: { token: jwt },
    };

    const notifications = io(`${API_URL}/notifications`, common);
    const chats = io(`${API_URL}/chat`, common);

    const sockets: AppSockets = { notifications, chats };
    socketsRef.current = sockets;
    tokenRef.current = jwt;

    // Update render-visible value
    setContextValue(sockets);

    // Cleanup on unmount or next token change
    return () => {
      notifications.disconnect();
      chats.disconnect();
      socketsRef.current = null;
      tokenRef.current = null;
      setContextValue(null);
    };
  }, [jwt]);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}
