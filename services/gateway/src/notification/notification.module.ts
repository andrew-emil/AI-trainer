import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { NotificationController } from './http/notification.controller';
import { NotificationConsumer } from './events/notification.consumer';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';

@Module({
  providers: [NotificationGateway, NotificationService],
  controllers: [NotificationController, NotificationConsumer],
  imports: [
    UserModule,
    RabbitMQClientModule.register("rabbit.interactionQueue", INTERACTION_SERVICE),
  ],
  exports: [NotificationService]
})
export class NotificationModule { }
