import { Inject, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationRepo } from 'src/repos/notification.repo';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { GATEWAY_DOMAIN_QUEUE } from 'src/common/constants/rabbitNames.constants';
import { GatewayPattern } from 'src/common/patterns/gateway.pattern';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepo: NotificationRepo,
    @Inject(GATEWAY_DOMAIN_QUEUE)
    private readonly gatewayDomainQueue: ClientProxy,
  ) { }

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = await this.notificationRepo.create(createNotificationDto);
    if (!notification) {
      throw new RpcException({
        status: 400,
        message: "Failed to create notification"
      })
    }
    const count = await this.notificationRepo.countUnread(notification.userId);

    const payload = {
      id: notification._id.toString(),
      type: notification.type,
      createdAt: new Date().toISOString(),
      message: notification.message,
      userId: notification.userId,
      count,
      metadata: { source: 'interaction-service' },
    }

    this.gatewayDomainQueue.emit(GatewayPattern.NOTIFICATION_CREATED, payload);
  }

  async findAll(limit = 20, page = 1, userId: string) {
    const [notifications, count] = await Promise.all([
      this.notificationRepo.findByUserId(userId, limit, page),
      this.notificationRepo.countUnread(userId),
    ]);
    return { notifications, count };
  }

  async markAsRead(id: string) {
    const notification = await this.notificationRepo.markRead(id);
    if (!notification) {
      throw new RpcException({
        status: 404,
        message: "Notification not found"
      })
    }
    return notification;
  }

  async markAllAsRead(userId: string) {
    const notifications = await this.notificationRepo.markAllRead(userId);
    return notifications;
  }

  async delete(id: string, userId: string) {
    const notification = await this.notificationRepo.delete(id, userId);
    return notification.count;
  }
}
