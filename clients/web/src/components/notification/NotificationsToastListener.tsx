import { useNotificationsSocket } from '@/hooks/useNotification';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export function NotificationsToastListener() {
    const { unreadCount } = useNotificationsSocket();

    const prev = useRef<number | null>(null);

    useEffect(() => {
        if (prev.current === null) {
            prev.current = unreadCount;
            return;
        }
        if (unreadCount > prev.current) {
            const diff = unreadCount - prev.current;
            toast(`You have ${diff} new notification${diff > 1 ? 's' : ''}.`);
        }

        prev.current = unreadCount;
    }, [unreadCount]);

    return null;
}
