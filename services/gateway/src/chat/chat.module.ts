import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { UserModule } from 'src/user/user.module';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';

@Module({
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
  imports: [
    UserModule,
    RabbitMQClientModule.register("rabbit.interactionQueue", INTERACTION_SERVICE)
  ]
})
export class ChatModule {}
