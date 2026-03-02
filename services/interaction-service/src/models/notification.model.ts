import { Document, model, Schema, Types } from "mongoose";
import { UUID } from "src/common/types/userSnapshot.type";
import { NotificationType } from "src/common/enums/notificationType.enum";

export interface INotification extends Document {
    _id: Types.ObjectId;
    userId: UUID;
    type: NotificationType;
    message: string;
    read: boolean;
    actionUrl?: string;
    seenAt?: Date;
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

export const NotificationSchema = new Schema<INotification>({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    actionUrl: { type: String },
    seenAt: { type: Date },
    metadata: { type: Object, default: {} },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

NotificationSchema.index({ userId: 1, createdAt: -1 });
NotificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export const Notification = model<INotification>('Notification', NotificationSchema);
