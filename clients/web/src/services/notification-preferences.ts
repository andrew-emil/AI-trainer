import axiosClient from '@/lib/axiosClient';
import { tryCatch } from '@/lib/try-catch';
import { NotificationPreference } from '@/types/entities';
import { UpdateNotificationPreferenceDto } from '@/types/notifications';

export const getNotificationPreferences = async () => {
  const [{ data }, error] = await tryCatch(
    axiosClient.get<NotificationPreference[]>('/notification-preferences')
  );
  return { data, error };
};

export const updateNotificationPreferences = async (
  dto: UpdateNotificationPreferenceDto
) => {
  const [{ data }, error] = await tryCatch(
    axiosClient.patch<NotificationPreference>('/notification-preferences', dto)
  );
  return { data, error };
};
