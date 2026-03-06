import { Document, model, Schema, Types } from "mongoose";
import { Message } from "./message.model";

export interface IConversation extends Document {
    _id: Types.ObjectId;
    traineeId: string;
    trainerId: string;
    createdAt: Date;
    updatedAt: Date;

    lastMessage?: {
        messageId: Types.ObjectId;
        text?: string;
        senderId?: string;
        createdAt?: Date;
    };

    metadata?: Record<string, any>;
}

export const ConversationSchema = new Schema<IConversation>({
    traineeId: { type: String, required: true },
    trainerId: { type: String, required: true },
    lastMessage: {
        type: {
            messageId: { type: Types.ObjectId, ref: Message.name },
            text: { type: String, required: true },
            senderId: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
        default: null,
    },
    metadata: { type: Object, default: {} },
}, { timestamps: true });

ConversationSchema.index({ traineeId: 1, trainerId: 1 }, { unique: true });
ConversationSchema.index({ traineeId: 1, updatedAt: -1 });
ConversationSchema.index({ trainerId: 1, updatedAt: -1 });

export const Conversation = model<IConversation>('Conversation', ConversationSchema);