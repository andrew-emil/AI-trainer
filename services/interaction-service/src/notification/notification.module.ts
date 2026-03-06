import { Module } from '@nestjs/common';
import { GATEWAY_DOMAIN_QUEUE } from 'src/common/constants/rabbitNames.constants';
import { RabbitProducerModule } from 'src/rabbit-producer/rabbit-producer.module';
import { ReposModule } from 'src/repos/repos.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [
    RabbitProducerModule.register("rabbit.gatewayDomainQueue", GATEWAY_DOMAIN_QUEUE),
    ReposModule
  ]
})
export class NotificationModule { }
