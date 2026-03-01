import { SocketContext } from '@/contexts/SocketContext';
import { useContext } from 'react';

export function useSockets() {
  return useContext(SocketContext);
}
