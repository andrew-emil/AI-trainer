import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from 'src/auth/dto/authPayload.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get('conversations')
    getConversations(@Req() req: { user: AuthPayloadDto }) {
        return this.chatService.listMyConversations(req.user.sub);
    }

    @Get("/:conversationId/messages")
    getMessages(@Param('conversationId') conversationId: string) {
        return this.chatService.getMessages(conversationId);
    }
}
