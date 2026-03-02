import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { RabbitProducerModule } from 'src/rabbit-producer/rabbit-producer.module';
import { GATEWAY_DOMAIN_QUEUE } from 'src/common/constants/rabbitNames.constants';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [
    RabbitProducerModule.register("rabbit.gatewayDomainQueue", GATEWAY_DOMAIN_QUEUE)
  ]
})
export class NotificationModule { }
