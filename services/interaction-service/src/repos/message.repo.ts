import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, IMessage } from '../database/models/message.model';

@Injectable()
export class MessageRepo {
    constructor(
        @InjectModel(Message.name)
        private readonly messageModel: Model<IMessage>,
    ) { }

    async create(data: Partial<IMessage>) {
        return this.messageModel.create(data);
    }

    async findMessagesByConversation(conversationId: string, limit = 50) {
        return this.messageModel
            .find({ conversationId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean()
            .exec();
    }

    async deleteMessage(messageId: string) {
        return this.messageModel.findByIdAndDelete(messageId).lean().exec();
    }
}