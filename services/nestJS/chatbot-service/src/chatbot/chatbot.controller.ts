import { Controller } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IncomingMessageDto } from './dto/incomingMessage.dto';

@Controller()
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) { }

  @MessagePattern("chat.incoming")
  handleIncomingMessages(@Payload() payload: IncomingMessageDto) {
    return this.chatbotService.handleUserMessage(payload);
  }
}
