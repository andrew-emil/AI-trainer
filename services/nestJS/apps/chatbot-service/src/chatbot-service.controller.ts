import { Patterns } from '@app/contracts/patterns';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatbotServiceService } from './chatbot-service.service';
import { IncomingMessageDto } from './dtos/incomingMessage.dto';

@Controller('chatbot-service')
export class ChatbotServiceController {
    constructor(
        private readonly chatbotService: ChatbotServiceService
    ) { }


    @MessagePattern(Patterns.CHAT_INCOMING)
    async handleIncomingMessages(@Payload() payload: IncomingMessageDto) {
        await this.chatbotService.handleIncomingMessage(payload)
    }
}
