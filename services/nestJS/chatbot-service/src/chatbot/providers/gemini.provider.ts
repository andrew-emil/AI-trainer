import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessageRole } from '../entity/message.entity';

export type TitleGenerationResponse = {
    success: boolean;
    title: string;
}

export type ConversationHistory = {
    role: MessageRole;
    parts: Array<{ text: string }>;
}

@Injectable()
export class GeminiProvider {
    private readonly ai: GoogleGenAI;
    private readonly errorChunkText = "An error occurred while generating the response. Please try again.";
    private readonly SYSTEM_INSTRUCTION =
        "You are an expert personal trainer and fitness coach. Your sole purpose is to answer questions related to gym workouts, exercises, nutrition, supplements, and general fitness. **You must politely refuse to answer any questions that fall outside of the gym and fitness domain.**";
    private readonly MODEL_NAME = 'gemini-2.5-flash'

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.ai = new GoogleGenAI({
            apiKey: this.configService.get<string>('GOOGLE_API_KEY'),
        });
    }
    async generateResponse(conversationHistory: ConversationHistory[]): Promise<string> {
        let fullBotResponse: string;
        try {
            const { text } = await this.ai.models.generateContent({
                model: this.MODEL_NAME,
                contents: conversationHistory,
                config: {
                    thinkingConfig: { thinkingBudget: 0 },
                    temperature: 0.0,
                    maxOutputTokens: 80,
                    systemInstruction: this.SYSTEM_INSTRUCTION
                }
            })

            if (!text) {
                throw new Error('Failed to generate response');
            }
            fullBotResponse = text
        } catch (error) {
            console.error(error)
            fullBotResponse = this.errorChunkText
        }
        return fullBotResponse
    }

    async generateDynamicTitle(firstUserMessage: string): Promise<TitleGenerationResponse> {
        const prompt = `Write a short chat title (max 6 words). Return title only.\nMessage: ${firstUserMessage}`;

        try {
            const { text } = await this.ai.models.generateContent({
                model: this.MODEL_NAME,
                contents: prompt,
            });

            const title: string = text ?? '';
            return {
                success: true,
                title: title.trim().replace(/^"|"$/g, '').slice(0, 80)
            }
        } catch (error) {
            console.error(error)
            return {
                success: false,
                title: this.errorChunkText
            }
        }
    }
}
