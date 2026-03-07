import { NotificationType } from "src/common/enums/entities.enum";

export type NewNotificationPayload = {
    id: string;
    userId: string;
    type: NotificationType;
    message: string;
    count: number;
    metadata?: Record<string, unknown>
    actionUrl?: string;
    createdAt: Date;
}