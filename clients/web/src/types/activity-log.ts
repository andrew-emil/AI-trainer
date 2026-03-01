import { ActivityType, Json } from './entities';

export interface CreateActivityLogDto {
  userId: string;
  type: ActivityType;
  title: string;
  description?: string;
  metadata?: Json;
}
