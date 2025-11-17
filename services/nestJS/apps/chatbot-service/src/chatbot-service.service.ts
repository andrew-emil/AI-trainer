import { Patterns } from '@app/contracts/patterns';
import { RMQ_TOKENS } from '@app/contracts/tokens';
import { GoogleGenAI } from '@google/genai';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncomingMessageDto } from './dtos/incomingMessage.dto';
import { OutgoingMessageChunkDto } from './dtos/outgoingMessageChun.dto';
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
        @Inject(RMQ_TOKENS.CHAT_OUTGOING_CLIENT)
        private readonly outgoingClient: ClientProxy,
        private readonly redisProvider: RedisProvider
    ) {
        this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    }

    async handleIncomingMessage(payload: IncomingMessageDto) {
        const { user_id, title, message } = payload

        const conversation = await this.findOrCreateConversation(user_id, title)
        const userMessage: Message = {
            role: MessageRole.USER,
            content: message,
            timestamp: new Date(),
        };
        conversation.messages.push(userMessage);

        await conversation.save()
        const conversationId = conversation._id as string
        let fullBotResponse = '';

        try {
            const streamResponse = await this.ai.models.generateContentStream({
                model: this.MODEL_NAME,
                contents: message,
                config: {
                    thinkingConfig: { thinkingBudget: 0 },
                    temperature: 0.0,
                    maxOutputTokens: 256,
                    systemInstruction: this.SYSTEM_INSTRUCTION
                }
            })

            for await (const chunk of streamResponse) {
                const chunkText = chunk.text;
                if (chunkText) {
                    fullBotResponse += chunkText;

                    const outgoingChunk: OutgoingMessageChunkDto = {
                        user_id: user_id,
                        conversation_id: conversationId,
                        chunk: chunkText,
                        isFinal: false,
                    };

                    // Emit chunk to the outgoing queue
                    this.outgoingClient.emit(Patterns.CHAT_OUTGOING, outgoingChunk);
                }
            }

            this.outgoingClient.emit(Patterns.CHAT_OUTGOING, {
                user_id: user_id,
                conversation_id: conversationId,
                chunk: '',
                isFinal: true,
            } as OutgoingMessageChunkDto);
            this.logger.log(`[AI Stream] Finished and signaled final chunk for ${conversationId}`);
        } catch (err: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            this.logger.error(`[AI Error] Gemini API streaming error: ${err.message}`);

            this.outgoingClient.emit(Patterns.CHAT_OUTGOING, {
                user_id: user_id,
                conversation_id: conversationId,
                chunk: this.errorChunkText,
                isFinal: true,
            } as OutgoingMessageChunkDto);
            fullBotResponse = this.errorChunkText;
        }

        if (fullBotResponse) {
            const botMessage: Message = {
                role: MessageRole.BOT,
                content: fullBotResponse,
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
                const cacheKey = `user:lastConversation:${updated.user_id}`;
                await this.redisProvider.set(cacheKey, updated.toObject(), this.CONV_CACHE_TTL);
            }

            this.logger.log(`[DB] Saved final bot response to conversation: ${conversationId}`);
        }
    }

    private async findOrCreateConversation(user_id: string, title?: string): Promise<Conversation> {
        const cacheKey = `user:lastConversation:${user_id}`;
        const cached = await this.redisProvider.get<Conversation & { _id: string }>(cacheKey);
        if (cached) {
            // Hydrate it as a Mongoose document if you want to call .save() on it:
            const doc = new this.conversationModel(cached);
            return await doc.save();
        }

        let conversation = await this.conversationModel
            .findOne({ user_id })
            .sort({ createdAt: -1 })
            .exec();

        if (!conversation) {
            conversation = new this.conversationModel({
                user_id,
                title: title || 'New Chat',
                messages: [],
            });
            this.logger.log(`[DB] Created new conversation: ${conversation._id as string}`);
        }
        return conversation;
    }
}
