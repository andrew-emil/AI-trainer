import { Module } from '@nestjs/common';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [
    RabbitMQClientModule.register("rabbit.authQueue", AUTH_SERVICE)
  ],
})
export class AdminModule {}
