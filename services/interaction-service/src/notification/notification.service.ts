import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationRepo } from 'src/repos/notification.repo';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepo: NotificationRepo
  ) { }

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = await this.notificationRepo.create(createNotificationDto);
    if (!notification) {
      throw new RpcException({
        status: 400,
        message: "Failed to create notification"
      })
    }

    const payload = {
      type: 'notification.created',
      occurred_at: new Date().toISOString(),
      payload: {
        notificationId: notification._id,
        userId: notification.userId,
        type: notification.type,
      },
      metadata: { source: 'interaction-service' },
    }
    return notification;
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
