import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { Conversation, ConversationSchema } from './entity/conversation.entity';
import { GeminiProvider } from './providers/gemini.provider';
import { ConfigModule } from '@nestjs/config';
import { RedisProvider } from 'src/providers/redis.provider';

@Module({
  controllers: [ChatbotController],
  providers: [ChatbotService, GeminiProvider, RedisProvider],
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    ConfigModule
  ],
  exports: [MongooseModule]
})
export class ChatbotModule {}
