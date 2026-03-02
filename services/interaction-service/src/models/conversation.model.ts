import { Document, model, Schema, Types } from "mongoose";

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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastMessage: {
        messageId: { type: Types.ObjectId, ref: 'Message' },
        text: String,
        senderId: String,
        createdAt: Date,
    },
    metadata: { type: Object, default: {} },
}, { timestamps: true });

ConversationSchema.index({ traineeId: 1, trainerId: 1 }, { unique: true });
ConversationSchema.index({ traineeId: 1, updatedAt: -1 });
ConversationSchema.index({ trainerId: 1, updatedAt: -1 });

export const Conversation = model<IConversation>('Conversation', ConversationSchema);