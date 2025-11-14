import { Controller, Get } from '@nestjs/common';
import { ChatbotServiceService } from './chatbot-service.service';

@Controller()
export class ChatbotServiceController {
  constructor(private readonly chatbotServiceService: ChatbotServiceService) {}

  @Get()
  getHello(): string {
    return this.chatbotServiceService.getHello();
  }
}
