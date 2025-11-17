import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum MessageRole {
    USER = 'user',
    BOT = 'bot',
}

export type MessageDocument = HydratedDocument<Message>;

@Schema({ _id: false })
export class Message {
    @Prop({ type: String, enum: MessageRole, required: true })
    role: MessageRole;

    @Prop({ required: true })
    content: string;

    @Prop({ type: Date, default: Date.now, required: true })
    timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);