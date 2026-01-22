import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisProvider } from '../providers/redis.provider';
import { Conversation } from './entity/conversation.entity';
import { GeminiProvider } from './providers/gemini.provider';
import { IncomingMessageDto } from './dto/incomingMessage.dto';
import { Message, MessageRole } from './entity/message.entity';

@Injectable()
export class ChatbotService {
    private readonly CONV_CACHE_TTL = 60 * 30;

    constructor(
        @InjectModel(Conversation.name)
        private readonly conversationModel: Model<Conversation>,
        private readonly geminiProvider: GeminiProvider,
        private readonly redis: RedisProvider,
    ) { }

    async handleUserMessage(dto: IncomingMessageDto) {
        const { user_id, title, message } = dto

        const conversation = await this.findOrCreateConversation(user_id, message, title);

        const userMessage: Message = {
            role: MessageRole.USER,
            content: message,
            timestamp: new Date(),
        };
        conversation.messages.push(userMessage);

        await conversation.save()
        const conversationId = conversation._id.toString()
        const conversationTitle = conversation.title;

        const conversationHistory = this.buildConversationHistory(conversation.messages);
        const botResponse = await this.geminiProvider.generateResponse(conversationHistory);

        const botMessage: Message = {
            role: MessageRole.BOT,
            content: botResponse,
            timestamp: new Date(),
        };
        const updated = await this.conversationModel.findByIdAndUpdate(
            conversationId,
            { $push: { messages: botMessage } },
            { new: true }
        ).exec();

        if (updated) {
            // refresh cache
            const convKey = `conversation:${updated._id.toString()}`;
            const lastConvKey = `user:lastConversation:${user_id}`;

            await this.redis.set(convKey, updated.toObject(), this.CONV_CACHE_TTL);
            await this.redis.set(lastConvKey, updated._id.toString(), this.CONV_CACHE_TTL);
        }

        return {
            user_id,
            conversation_id: conversationId,
            title: conversationTitle,
            response: botResponse,
        }
    }

    private async findOrCreateConversation(
        user_id: string,
        firstMessage: string,
        title?: string,
    ): Promise<Conversation> {
        const userLastConvKey = `user:lastConversation:${user_id}`;
        const lastConvId = await this.redis.get<string>(userLastConvKey);

        if (lastConvId) {
            const cachedConvKey = `conversation:${lastConvId}`;
            const cachedConv = await this.redis.get<Conversation & { _id: string }>(cachedConvKey);
            if (cachedConv) return new this.conversationModel(cachedConv);

            // Fallback: last conversation from DB
            const lastConversation = await this.conversationModel
                .findOne({ user_id })
                .sort({ createdAt: -1 })
                .exec();

            if (lastConversation) {
                return lastConversation;
            }
        }

        // If we're here, this is a NEW chat (no title) OR the user has no previous conversations
        const dynamicTitle = title ?? (await this.geminiProvider.generateDynamicTitle(firstMessage)).title;


        const conversation = new this.conversationModel({
            user_id,
            title: dynamicTitle,
            messages: [],
        });

        await conversation.save();

        // Cache both the conversation object and the last conversation ID
        const newConvKey = `conversation:${conversation._id.toString()}`;
        const newLastConvKey = `user:lastConversation:${user_id}`;

        await Promise.all([
            this.redis.set(newConvKey, conversation.toObject(), this.CONV_CACHE_TTL),
            this.redis.set(newLastConvKey, conversation._id, this.CONV_CACHE_TTL),
        ])

        return conversation;
    }

    /**
     * Build conversation history for the AI model
     * Converts Message[] to the format expected by Google GenAI
     */
    private buildConversationHistory(messages: Message[]): Array<{ role: MessageRole; parts: Array<{ text: string }> }> {
        return messages.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
        }));
    }
}
