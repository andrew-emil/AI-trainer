import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Conversation, IConversation } from "../database/models/conversation.model";

@Injectable()
export class ConversationRepo {
    constructor(
        @InjectModel(Conversation.name)
        private readonly conversationModel: Model<IConversation>,
    ) { }

    async create(data: Partial<IConversation>) {
        return this.conversationModel.create(data);
    }

    async findByUserId(userId: string, limit = 20) {
        return this.conversationModel
            .find({ $or: [{ traineeId: userId }, { trainerId: userId }] })
            .sort({ updatedAt: -1 })
            .limit(limit)
            .lean()
            .exec();
    }

    async findById(id: string) {
        return this.conversationModel.findById(id).lean().exec();
    }

    async updateLastMessage(conversationId: string, message: any) {
        return this.conversationModel.updateOne(
            { _id: conversationId },
            { $set: { lastMessage: message, updatedAt: new Date() } },
        );
    }
}