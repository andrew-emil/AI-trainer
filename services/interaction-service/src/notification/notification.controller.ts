import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.service';
import { NotificationPattern } from 'src/common/patterns/notification.pattern';
import { GetAllNotificationDto } from './dto/getAllNotification.dto';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern(NotificationPattern.CREATE)
  create(@Payload() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @MessagePattern(NotificationPattern.GET_ALL)
  findAll(@Payload() payload: GetAllNotificationDto) {
    return this.notificationService.findAll(payload.limit, payload.page, payload.userId);
  }

  @MessagePattern(NotificationPattern.MARK_AS_READ)
  markAsRead(@Payload() payload: { id: string }) {
    return this.notificationService.markAsRead(payload.id);
  }

  @MessagePattern(NotificationPattern.MARK_ALL_AS_READ)
  markAllAsRead(@Payload() payload: { userId: string }) {
    return this.notificationService.markAllAsRead(payload.userId);
  }

  @MessagePattern(NotificationPattern.DELETE)
  delete(@Payload() payload: { id: string, userId: string }) {
    return this.notificationService.delete(payload.id, payload.userId);
  }
}
