import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation } from 'src/chatbot/entity/conversation.entity';
import { RedisProvider } from '../providers/redis.provider';
import { GetAllPayloadDto } from './dto/getAllPayload.dto';
import { GetAndDeletePayloadDto } from './dto/getAndDeletePayload.dto';
import { UpdatePayloadDto } from './dto/updatePayload.dto';

@Injectable()
export class HistoryService {
    constructor(
        @InjectModel(Conversation.name)
        private readonly conversationModel: Model<Conversation>,
        private readonly redisProvider: RedisProvider
    ) { }

    async getAllConversation(payload: GetAllPayloadDto) {
        return await this.conversationModel
            .find({ user_id: payload.userId })
            .sort({ createdAt: -1 })
            .select({
                _id: 1,
                user_id: 1,
                title: 1,
                createdAt: 1,
            })
            .lean()
            .exec()
    }

    async getConversationById(payload: GetAndDeletePayloadDto) {
        // Check cache first using the conversation ID
        const convKey = `conversation:${payload._id}`;
        const cached = await this.redisProvider.get<Conversation & { _id: string }>(convKey);

        if (cached) {
            return cached;
        }

        // If not in cache, fetch from database
        const conversation = await this.conversationModel
            .findOne({
                _id: payload._id,
                user_id: payload.userId
            })
            .exec()

        if (!conversation)
            throw new NotFoundException("Conversation not found")

        return conversation.toObject()
    }

    async updateConversationTitle(payload: UpdatePayloadDto) {
        const updatedConversation = await this.conversationModel.
            findOneAndUpdate(
                {
                    _id: payload._id,
                    user_id: payload.user_id
                },
                { title: payload.title },
                { new: true }
            )
        if (!updatedConversation)
            throw new NotFoundException("Conversation not found")

        return updatedConversation.toObject()
    }

    async deleteConversation(payload: GetAndDeletePayloadDto) {
        const deletedConversation = await this.conversationModel.findOneAndDelete({
            _id: payload._id,
            user_id: payload.userId
        });

        if (!deletedConversation)
            throw new NotFoundException("Conversation not found")

        return deletedConversation.toObject()
    }
}
