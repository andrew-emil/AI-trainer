import { io, Socket } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL;

export function createSockets(jwt: string) {
  const commonOptions = {
    transports: ['websocket'],
    withCredentials: true,
    auth: { token: jwt },
  };

  const notificationsSocket: Socket = io(
    `${API_URL}/notifications`,
    commonOptions,
  );
  const chatsSocket: Socket = io(`${API_URL}/chat`, commonOptions);

  return { notificationsSocket, chatsSocket };
}
