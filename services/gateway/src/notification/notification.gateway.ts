import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthPayloadDto } from 'src/auth/dto/authPayload.dto';
import { SocketWithAuth } from 'src/socket-io.adapter';
import { NewNotificationPayload } from './dto/newNotification.type';

@WebSocketGateway({
  namespace: '/notification',
  origin: process.env.FRONTEND_URL,
  credentials: true,
})
export class NotificationGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private userRoom(userId: string) {
    return `user:${userId}`;
  }

  async handleConnection(client: SocketWithAuth) {
    const user = client.data.user as AuthPayloadDto;
    if (!user) {
      client.disconnect();
      return;
    }

    await client.join(this.userRoom(user.sub));
  }

  emitNewNotification(recipientId: string, payload: Omit<NewNotificationPayload, "userId">) {
    this.server.to(this.userRoom(recipientId)).emit('notification:new', JSON.stringify(payload));
  }

  emitUnReadNotificationCount(recipientId: string, count: number) {
    this.server.to(this.userRoom(recipientId)).emit('notification:unreadCount', JSON.stringify({ count }));
  }
}
