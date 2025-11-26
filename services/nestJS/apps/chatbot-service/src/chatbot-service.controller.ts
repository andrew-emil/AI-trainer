import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Patterns } from '@app/contracts/patterns';
import { ChatbotServiceService } from './chatbot-service.service';
import { IncomingMessageDto } from './dtos/incomingMessage.dto';

@Controller()
export class ChatbotServiceController {
    constructor(private readonly chatbotService: ChatbotServiceService) { }

    @EventPattern(Patterns.CHAT_INCOMING)
    async handleIncomingMessages(@Payload() payload: IncomingMessageDto) {
        console.log('MS CHAT_INCOMING payload:', payload);
        await this.chatbotService.handleIncomingMessage(payload);
    }
}
