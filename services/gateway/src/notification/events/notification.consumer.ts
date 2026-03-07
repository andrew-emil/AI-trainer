import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { GatewayPattern } from "src/common/patterns/gateway.pattern";
import type { NewNotificationPayload } from "../dto/newNotification.type";
import { NotificationService } from "../notification.service";

@Controller()
export class NotificationConsumer {
    constructor(private readonly notificationService: NotificationService) { }

    @EventPattern(GatewayPattern.NOTIFICATION_CREATED)
    async handleNotificationCreated(@Payload() data: NewNotificationPayload) {
        this.notificationService.emitNotificationToUser(data)
    }
}