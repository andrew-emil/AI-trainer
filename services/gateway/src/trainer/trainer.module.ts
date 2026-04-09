import { Module } from '@nestjs/common';
import { AUTH_SERVICE, COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';

@Module({
  controllers: [TrainerController],
  providers: [TrainerService],
  imports: [
    RabbitMQClientModule.register('rabbit.authQueue', AUTH_SERVICE),
    RabbitMQClientModule.register('rabbit.coachDomainQueue', COACH_DOMAIN_SERVICE),
  ]
})
export class TrainerModule { }
