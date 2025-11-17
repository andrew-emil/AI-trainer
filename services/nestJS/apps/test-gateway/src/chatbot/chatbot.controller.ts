import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Patterns } from '@app/contracts/patterns';
import { OutgoingMessageChunkDto } from './dtos/outgoingMessageChunk.dto';
import { ChatbotGateway } from './chatbot.gateway';

@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatGateway: ChatbotGateway) { }

    @EventPattern(Patterns.CHAT_OUTGOING)
    handleChatChunk(@Payload() chunk: OutgoingMessageChunkDto) {
        // chunk = { user_id, conversation_id, chunk, isFinal }
        this.chatGateway.sendChunkToClient(chunk);
    }
}
