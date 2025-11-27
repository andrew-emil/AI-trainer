import { GoogleGenAI } from '@google/genai';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncomingMessageDto } from './dtos/incomingMessage.dto';
import { Conversation } from './entity/conversation.entity';
import { Message, MessageRole } from './entity/message.entity';
import { RedisProvider } from './providers/redis.provider';

const GEMINI_API_KEY = process.env.API_KEY!;

@Injectable()
export class ChatbotServiceService {
    private readonly logger = new Logger(ChatbotServiceService.name);
    private readonly ai: GoogleGenAI;
    private readonly errorChunkText = "An error occurred while generating the response. Please try again.";
    private readonly SYSTEM_INSTRUCTION =
        "You are an expert personal trainer and fitness coach. Your sole purpose is to answer questions related to gym workouts, exercises, nutrition, supplements, and general fitness. **You must politely refuse to answer any questions that fall outside of the gym and fitness domain.**";
    private readonly MODEL_NAME = 'gemini-2.5-flash'
    private readonly CONV_CACHE_TTL = 60 * 30;

    constructor(
        @InjectModel(Conversation.name)
        private conversationModel: Model<Conversation>,
        private readonly redisProvider: RedisProvider
    ) {
        this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    }

    async handleIncomingMessage(payload: IncomingMessageDto) {
        const { user_id, title, message } = payload

        const conversation = await this.findOrCreateConversation(user_id, message, title);
        const userMessage: Message = {
            role: MessageRole.USER,
            content: message,
            timestamp: new Date(),
        };
        conversation.messages.push(userMessage);

        await conversation.save()
        const conversationId = conversation._id as string
        const conversationTitle = conversation.title;

        let botResponseText: string;

        try {
            // Build conversation history for context-aware responses
            const conversationHistory = this.buildConversationHistory(conversation.messages);

            const fullBotResponse = await this.ai.models.generateContent({
                model: this.MODEL_NAME,
                contents: conversationHistory,
                config: {
                    thinkingConfig: { thinkingBudget: 0 },
                    temperature: 0.0,
                    maxOutputTokens: 256,
                    systemInstruction: this.SYSTEM_INSTRUCTION
                }
            })

            this.logger.log(`AI Finished response for ${conversationId}`);
            botResponseText = fullBotResponse.text ?? this.errorChunkText;
        } catch (err: any) {
            this.logger.error(`AI Error: ${err.message}`);
            botResponseText = this.errorChunkText;
        }

        // Save the bot's response to the database
        const botMessage: Message = {
            role: MessageRole.BOT,
            content: botResponseText,
            timestamp: new Date(),
        };

        // Push the bot's response to the messages array
        const updated = await this.conversationModel.findByIdAndUpdate(
            conversationId,
            { $push: { messages: botMessage } },
            { new: true }
        ).exec();

        if (updated) {
            // refresh cache
            const convKey = `conversation:${updated._id as string}`;
            const lastConvKey = `user:lastConversation:${user_id}`;

            await this.redisProvider.set(convKey, updated.toObject(), this.CONV_CACHE_TTL);
            await this.redisProvider.set(lastConvKey, updated._id as string, this.CONV_CACHE_TTL);
        }

        this.logger.log(`[DB] Saved final bot response to conversation: ${conversationId}`);

        // Return the final response
        return {
            user_id,
            conversation_id: conversationId,
            title: conversationTitle,
            response: botResponseText,
        }
    }

    private async findOrCreateConversation(
        user_id: string,
        firstMessage: string,
        title?: string,
    ): Promise<Conversation> {
        const userLastConvKey = `user:lastConversation:${user_id}`;
        const lastConvId = await this.redisProvider.get<string>(userLastConvKey);

        if (lastConvId) {
            const cachedConvKey = `conversation:${lastConvId}`;
            const cachedConv = await this.redisProvider.get<Conversation & { _id: string }>(cachedConvKey);
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
        const dynamicTitle = title ?? this.generateDynamicTitle(firstMessage);

        const conversation = new this.conversationModel({
            user_id,
            title: dynamicTitle,
            messages: [],
        });

        await conversation.save();

        // Cache both the conversation object and the last conversation ID
        const newConvKey = `conversation:${conversation._id as string}`;
        const newLastConvKey = `user:lastConversation:${user_id}`;

        await this.redisProvider.set(newConvKey, conversation.toObject(), this.CONV_CACHE_TTL);
        await this.redisProvider.set(newLastConvKey, conversation._id as string, this.CONV_CACHE_TTL);

        this.logger.log(`[DB] Created new conversation: ${conversation._id as string}`);

        return conversation;
    }


    private generateDynamicTitle(message: string): string {
        if (!message) return 'New Chat';

        // Very simple: first 6 words, max ~50 chars
        const maxChars = 50;
        const words = message.trim().split(/\s+/).slice(0, 6).join(' ');
        const truncated = words.length > maxChars ? words.slice(0, maxChars) : words;

        return truncated.trim() + (truncated.length === maxChars ? '…' : '');
    }

    /**
     * Build conversation history for the AI model
     * Converts Message[] to the format expected by Google GenAI
     */
    private buildConversationHistory(messages: Message[]): Array<{ role: string; parts: Array<{ text: string }> }> {
        return messages.map(msg => ({
            role: msg.role === MessageRole.USER ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));
    }

}
