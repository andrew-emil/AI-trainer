import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';

@Module({
  providers: [MailsService],
  imports: [
    RabbitMQClientModule.register("rabbit.interactionQueue", INTERACTION_SERVICE),
  ],
  exports: [MailsService]
})
export class MailsModule {}
