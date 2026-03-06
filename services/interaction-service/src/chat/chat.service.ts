import { Inject, Injectable } from '@nestjs/common';
import { MessageRepo } from 'src/repos/message.repo';
import { CreateChatDto } from './dto/create-chat.dto';
import { SendMessageDto } from './dto/sendMessage.dto';
import { ConversationRepo } from 'src/repos/conversation.repo';
import { IMessage } from 'src/database/models/message.model';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { GATEWAY_DOMAIN_QUEUE, INTERACTION_QUEUE } from 'src/common/constants/rabbitNames.constants';
import { GatewayPattern } from 'src/common/patterns/gateway.pattern';
import { NotificationPattern } from 'src/common/patterns/notification.pattern';
import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto';
import { NotificationType } from 'src/common/enums/notificationType.enum';

@Injectable()
export class ChatService {
  constructor(
    @Inject(GATEWAY_DOMAIN_QUEUE)
    private readonly gatewayDomainQueue: ClientProxy,
    @Inject(INTERACTION_QUEUE)
    private readonly interactionQueue: ClientProxy,
    private readonly messageRepo: MessageRepo,
    private readonly conversationRepo: ConversationRepo
  ) { }

  async createConversation(createChatDto: CreateChatDto) {
    return this.conversationRepo.create(createChatDto);
  }

  async listMyConversations(userId: string) {
    return this.conversationRepo.findByUserId(userId);
  }

  async sendMessage(sendMessageDto: SendMessageDto) {
    const conversation = await this.conversationRepo.findById(sendMessageDto.conversationId);
    if (!conversation) {
      throw new RpcException({
        status: 404,
        message: 'Conversation not found'
      });
    }
    const payload: Partial<IMessage> = {
      conversationId: new Types.ObjectId(conversation._id.toString()),
      sender: sendMessageDto.sender,
      receiverId: sendMessageDto.receiverId,
      text: sendMessageDto.text,
      metadata: sendMessageDto.metadata ?? {},
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const message = await this.messageRepo.create(payload);
    const updatedConversation = await this.conversationRepo.updateLastMessage(sendMessageDto.conversationId, message);
    if (!updatedConversation.modifiedCount) {
      await this.deleteMessage(message._id.toString());
      throw new RpcException({
        status: 500,
        message: 'Failed to update conversation'
      });
    }
    this.gatewayDomainQueue.emit(GatewayPattern.MESSAGE_CREATED, { message });
    const notificationDto: CreateNotificationDto = {
      userId: message.receiverId,
      type: NotificationType.NEW_CHAT_MESSAGE,
      message: message.text,
      metadata: {
        conversationId: message.conversationId.toString(),
        messageId: message._id.toString()
      }
    }
    this.interactionQueue.send(NotificationPattern.CREATE, notificationDto);
  }

  async getMessages(conversationId: string) {
    return this.messageRepo.findMessagesByConversation(conversationId);
  }

  async deleteMessage(messageId: string) {
    const deletedMessage = await this.messageRepo.deleteMessage(messageId);
    if (!deletedMessage) {
      throw new RpcException({
        status: 404,
        message: 'Message not found'
      });
    }
    this.gatewayDomainQueue.emit(GatewayPattern.MESSAGE_DELETED, { messageId });
  }
}
