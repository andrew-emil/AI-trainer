import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Conversation } from '../entity/conversation.entity';
import { UpdatePayloadDto } from './dtos/updatePayload.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GetAllPayloadDto } from './dtos/getAllPayload.dto';
import { GetAndDeletePayloadDto } from './dtos/getAndDeletePayload.dto';

@Injectable()
export class HistoryService {
    constructor(
        @InjectModel(Conversation.name)
        private readonly conversationModel: Model<Conversation>
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
        const conversation = await this.conversationModel
            .findOne({
                _id: payload._id,
                user_id: payload.userId
            })
            .exec()

        if (!conversation)
            throw new BadRequestException("Conversation not found")

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
            throw new BadRequestException("Conversation not found")

        return updatedConversation.toObject()
    }

    async deleteConversation(payload: GetAndDeletePayloadDto) {
        const deletedConversation = await this.conversationModel.findOneAndDelete({
            _id: payload._id,
            user_id: payload.userId
        });

        if (!deletedConversation)
            throw new BadRequestException("Conversation not found")

        return deletedConversation.toObject()
    }
}
