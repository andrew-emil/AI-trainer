import { Controller, Delete, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from '../notification.service';
import type { CustomRequest } from 'src/common/types/customRequest.type';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Get()
    async findAll(
        @Query('limit') limit: string,
        @Query('page') page: string,
        @Req() { user }: CustomRequest
    ) {
        return this.notificationService.findAll(parseInt(limit), parseInt(page), user.sub)
    }

    @Patch('mark-as-read/:id')
    async markAsRead(@Param('id') id: string) {
        return this.notificationService.markAsRead(id)
    }

    @Patch('mark-all-as-read')
    async markAllAsRead(@Req() { user }: CustomRequest) {
        return this.notificationService.markAllAsRead(user.sub)
    }

    @Delete("/:id")
    async delete(@Param('id') id: string) {
        return this.notificationService.delete(id)
    }
}
