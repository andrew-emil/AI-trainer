import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OutgoingMessageChunkDto } from './dtos/outgoingMessageChunk.dto';
import { RMQ_TOKENS } from '@app/contracts/tokens';
import { Patterns } from '@app/contracts/patterns';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatbotGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(RMQ_TOKENS.CHAT_OUTGOING_CLIENT)
    private readonly client: ClientProxy,
  ) { }

  private getRoom(userId: string, conversationId: string) {
    return `chat:${userId}:${conversationId}`;
  }

  // Client tells gateway which conversation it cares about
  @SubscribeMessage('chat.join')
  async handleJoin(
    @MessageBody() payload: { user_id: string; conversation_id: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const room = this.getRoom(payload.user_id, payload.conversation_id);
    await socket.join(room);
    return { joined: room };
  }

  // Client sends message → gateway sends CHAT_INCOMING to chatbot service
  @SubscribeMessage('chat.send')
  handleSend(
    @MessageBody()
    payload: { user_id: string; title?: string; message: string },
  ) {
    this.client.emit(Patterns.CHAT_INCOMING, payload);
    return { status: 'queued' };
  }

  // Called from ChatbotEventsController when a chunk arrives from RMQ
  sendChunkToClient(chunk: OutgoingMessageChunkDto) {
    const room = this.getRoom(chunk.user_id, chunk.conversation_id);
    this.server.to(room).emit('chat.chunk', chunk);
  }
}
