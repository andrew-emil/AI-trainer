import { Module } from '@nestjs/common';
import { GATEWAY_DOMAIN_QUEUE, INTERACTION_QUEUE } from 'src/common/constants/rabbitNames.constants';
import { RabbitProducerModule } from 'src/rabbit-producer/rabbit-producer.module';
import { ReposModule } from 'src/repos/repos.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [
    ReposModule,
    RabbitProducerModule.register("rabbit.gatewayDomainQueue", GATEWAY_DOMAIN_QUEUE),
    RabbitProducerModule.register("rabbit.interactionQueue", INTERACTION_QUEUE)
  ]
})
export class ChatModule { }
