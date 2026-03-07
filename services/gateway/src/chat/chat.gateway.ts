import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import type { SocketWithAuth } from 'src/socket-io.adapter';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/sendMessage.dto';
import { UserService } from 'src/user/user.service';
import { UserSnapshot } from 'src/common/types/userSnapshot.type';

@WebSocketGateway({
  namespace: '/chat',
  origin: process.env.FRONTEND_URL,
  credentials: true,
})
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService
  ) { }
  @WebSocketServer()
  server: Server;

  private conversationRoom(conversationId: string) {
    return `conv:${conversationId}`;
  }

  @SubscribeMessage('conversation.join')
  async onConversationJoin(
    @ConnectedSocket() client: SocketWithAuth,
    @MessageBody() body: string
  ) {
    const { conversationId } = JSON.parse(body) as { conversationId: string };

    await client.join(this.conversationRoom(conversationId));
    return { ok: true, room: this.conversationRoom(conversationId) };
  }

  @SubscribeMessage('message.send')
  async onMessageSend(
    @ConnectedSocket() client: SocketWithAuth,
    @MessageBody() body: string
  ) {
    const { sub: userId } = client.data.user
    const { conversationId, text, receiverId } = JSON.parse(body) as Omit<SendMessageDto, 'sender'>
    const user = await this.userService.findOne(userId)
    const sender: UserSnapshot = {
      userId,
      username: user.username,
      avatarUrl: user.avatar,
      role: user.role
    }
    const createdMessage = await this.chatService.sendMessage({ receiverId, conversationId, text, sender })

    this.server.to(this.conversationRoom(conversationId)).emit('message.created', createdMessage)
  }
}
