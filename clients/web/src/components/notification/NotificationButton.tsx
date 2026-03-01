import { useNotificationsSocket } from '@/hooks/useNotification';
import { Bell } from 'lucide-react';
import { Activity, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { NotificationList } from './NotificationList';
import { useTranslation } from 'react-i18next';

function NotificationButton() {
    const { unreadCount, showUnread } = useNotificationsSocket();
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
                    <Bell className="w-5 h-5" />
                    <Activity mode={showUnread ? 'visible' : 'hidden'}>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] leading-5 text-center">
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                    </Activity>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b">
                    <h3 className="font-semibold leading-none tracking-tight">{t('settings.notifications.notifications')}</h3>
                </div>
                <NotificationList />
            </PopoverContent>
        </Popover>
    )
}

export default NotificationButton