import { useEffect, useState } from 'react';
import { useSockets } from './useSockets';

export function useNotificationsSocket() {
  const sockets = useSockets();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    if (!sockets) return;

    const s = sockets.notifications;

    const onUnreadCount = (data: string | { count: number }) => {
      const payload = typeof data === 'string' ? JSON.parse(data) : data;
      setUnreadCount(payload.count ?? 0);
    };

    const onNew = () => {
      setUnreadCount((c) => c + 1);
    };

    s.on('notification:unreadCount', onUnreadCount);
    s.on('notification:new', onNew);

    s.on('connect_error', (err) => {
      console.error('notifications connect_error:', err.message);
    });

    return () => {
      s.off('notification:unreadCount', onUnreadCount);
      s.off('notification:new', onNew);
    };
  }, [sockets]);

  return { unreadCount, showUnread: unreadCount > 0 };
}
