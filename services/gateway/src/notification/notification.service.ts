import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationGateway } from './notification.gateway';
import { INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationPattern } from 'src/common/patterns/notification.pattern';
import { NewNotificationPayload } from './dto/newNotification.type';
import { firstValueFrom } from 'rxjs';
import { GetAllNotification } from './types/getAllNotification.type';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(INTERACTION_SERVICE)
    private readonly interactionService: ClientProxy,
    private readonly userService: UserService,
    private readonly gateway: NotificationGateway,
  ) { }

  async createNotification(createNotificationDto: CreateNotificationDto) {
    const user = await this.userService.findOne(createNotificationDto.userId)
    if (!user) {
      throw new NotFoundException("User not found")
    }

    this.interactionService.emit(NotificationPattern.CREATE, createNotificationDto)
  }

  emitNotificationToUser(notification: NewNotificationPayload) {
    this.gateway.emitNewNotification(notification.userId, notification)
  }

  async findAll(limit = 20, page = 1, userId: string) {
    const user = await this.userService.findOne(userId)
    if (!user) {
      throw new NotFoundException("User not found")
    }
    const { notifications, count } = await firstValueFrom(
      this.interactionService.send<GetAllNotification>(NotificationPattern.GET_ALL, { limit, page, userId })
    )
    return {
      notifications,
      count,
      pages: Math.ceil(count / limit),
      page,
    }
  }

  async markAsRead(id: string) {
    return firstValueFrom(
      this.interactionService.send(NotificationPattern.MARK_AS_READ, id)
    )
  }

  async markAllAsRead(userId: string) {
    const user = await this.userService.findOne(userId)
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return await firstValueFrom(
      this.interactionService.send(NotificationPattern.MARK_ALL_AS_READ, userId)
    )
  }

  async delete(id: string) {
    const { count } = await firstValueFrom<{ count: number }>(
      this.interactionService.send(NotificationPattern.DELETE, id)
    )
    if (count === 0) {
      throw new NotFoundException("Notification not found")
    }
    return
  }
}
