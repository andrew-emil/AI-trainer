import { Document, model, Schema, Types } from "mongoose";
import { IUserSnapshot } from "src/common/types/userSnapshot.type";
import { UUID } from "src/common/types/userSnapshot.type";
import { Conversation } from "./conversation.model";

export interface IMessage extends Document {
    _id: Types.ObjectId;
    conversationId: Types.ObjectId;
    sender: IUserSnapshot;
    receiverId: UUID;
    text: string;
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

export const MessageSchema = new Schema<IMessage>({
    conversationId: { type: Types.ObjectId, ref: Conversation.name, required: true },
    sender: { type: Object, required: true },
    receiverId: { type: String, required: true },
    text: { type: String, required: true },
    metadata: { type: Object, default: {} },
}, { timestamps: true });

MessageSchema.index({ conversationId: 1, createdAt: -1 }); // fetch latest messages fast
MessageSchema.index({ receiverId: 1, createdAt: -1 });     // unread notifications / push queue
MessageSchema.index({ 'sender.userId': 1, createdAt: -1 }); // audit / history queries

export const Message = model<IMessage>('Message', MessageSchema);