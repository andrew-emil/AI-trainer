import { createContext } from 'react';
import type { Socket } from 'socket.io-client';

export type AppSockets = {
  notifications: Socket;
  chats: Socket;
};

export const SocketContext = createContext<AppSockets | null>(null);
