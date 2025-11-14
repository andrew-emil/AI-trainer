import { Module } from '@nestjs/common';
import { ChatbotServiceController } from './chatbot-service.controller';
import { ChatbotServiceService } from './chatbot-service.service';

@Module({
  imports: [],
  controllers: [ChatbotServiceController],
  providers: [ChatbotServiceService],
})
export class ChatbotServiceModule {}
