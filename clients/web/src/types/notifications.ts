import { NotificationType } from './entities';

export interface UpdateNotificationPreferenceDto {
  type: NotificationType;
  enabled: boolean;
}
