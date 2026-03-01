import { ScrollArea } from '@/components/ui/scroll-area';
import { getAllNotifications } from '@/services/notifications';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NotificationItem from './NotificationItem';


export function NotificationList() {
    const { data, isPending, isError } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const { data, error } = await getAllNotifications({ page: 1, take: 20 });
            if (error) throw error;
            return data;
        },
    });
    const { t } = useTranslation()

    if (isPending) {
        return (
            <div className="flex h-[300px] items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex h-[300px] items-center justify-center p-4 text-center text-sm text-destructive">
                {t('settings.notifications.failedToLoad')}
            </div>
        );
    }

    if (data.data.length === 0) {
        return (
            <div className="flex h-[300px] flex-col items-center justify-center gap-2 p-4 text-center">
                <p className="text-sm text-muted-foreground">{t('settings.notifications.noNotifications')}</p>
            </div>
        );
    }

    return (
        <ScrollArea className="h-[400px]">
            <div className="flex flex-col">
                {data.data.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                ))}
            </div>
        </ScrollArea>
    );
}

