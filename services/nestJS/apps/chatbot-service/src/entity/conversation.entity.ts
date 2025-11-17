import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Message, MessageSchema } from "./message.entity";

@Schema({
    collection: 'conversation',
    timestamps: true
})
export class Conversation extends Document {
    @Prop({
        required: true,
        type: String,
    })
    user_id: string;

    @Prop({
        required: true,
        type: String,
    })
    title: string;

    @Prop({ type: [MessageSchema], required: true, default: [] })
    messages: Message[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);