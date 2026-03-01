import { getNotificationPreferences } from '@/services/notification-preferences';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Bell } from 'lucide-react';
import { Activity } from 'react';
import { useTranslation } from 'react-i18next';
import EgyptianCard from '../ui/EgyptianCard';
import EgyptianDivider from '../ui/EgyptianDivider';
import NotificationSettingsItem from './NotificationSettingsItem';

const NotificationSettings = () => {
    const { t, i18n } = useTranslation();
    const dir = i18n.dir();

    const { data: { data: preferences, error: preferencesError } } = useSuspenseQuery({
        queryKey: ['notification-preferences'],
        queryFn: getNotificationPreferences,
    })

    if (preferencesError) {
        return (
            <EgyptianCard hoverable={false}>
                <h2 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    {t('settings.notifications.title')}
                </h2>
                <div className="flex justify-center p-8">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            </EgyptianCard>
        );
    }

    return (
        <EgyptianCard hoverable={false}>
            <h2 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                {t('settings.notifications.title')}
            </h2>

            <EgyptianDivider className="mb-6" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                <Activity mode={preferences.length > 0 ? 'visible' : 'hidden'}>
                    {preferences.map((pref) => (
                        <NotificationSettingsItem
                            key={pref.id}
                            pref={pref}
                            dir={dir}
                        />
                    ))}
                </Activity>
                <Activity mode={preferences.length > 0 ? 'hidden' : 'visible'}>
                    <p className="text-muted-foreground text-sm col-span-full text-center py-4">
                        {t('settings.notifications.noNotifications')}
                    </p>
                </Activity>
            </div>
        </EgyptianCard>
    );
};

export default NotificationSettings;
