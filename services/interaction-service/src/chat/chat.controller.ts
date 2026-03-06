import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { SendMessageDto } from './dto/sendMessage.dto';
import { ChatPattern } from 'src/common/patterns/chat.pattern';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @MessagePattern(ChatPattern.CREATE_CONVERSATION)
  createConversation(@Payload() createChatDto: CreateChatDto) {
    return this.chatService.createConversation(createChatDto);
  }

  @MessagePattern(ChatPattern.LIST_MY_CONVERSATIONS)
  listMyConversations(@Payload() { userId }: { userId: string }) {
    return this.chatService.listMyConversations(userId);
  }

  @MessagePattern(ChatPattern.SEND_MESSAGE)
  sendMessage(@Payload() sendMessageDto: SendMessageDto) {
    return this.chatService.sendMessage(sendMessageDto);
  }

  @MessagePattern(ChatPattern.GET_MESSAGES)
  getMessages(@Payload() { conversationId }: { conversationId: string }) {
    return this.chatService.getMessages(conversationId);
  }

  @MessagePattern(ChatPattern.DELETE_MESSAGE)
  deleteMessage(@Payload() { messageId }: { messageId: string }) {
    return this.chatService.deleteMessage(messageId);
  }
}
