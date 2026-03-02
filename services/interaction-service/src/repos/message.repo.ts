import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, IMessage } from '../models/message.model';

@Injectable()
export class MessageRepo {
    constructor(
        @InjectModel(Message.name)
        private readonly messageModel: Model<IMessage>,
    ) { }

    async create(data: Partial<IMessage>) {
        return this.messageModel.create(data);
    }

    async findByConversation(conversationId: string, limit = 20) {
        return this.messageModel
            .find({ conversationId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean()
            .exec();
    }

    async markDeleted(messageId: string) {
        return this.messageModel.updateOne(
            { _id: messageId },
            { $set: { deleted: true } },
        );
    }
}