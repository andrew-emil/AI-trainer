import { Module } from '@nestjs/common';
import { TraineeService } from './trainee.service';
import { TraineeController } from './trainee.controller';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { AUTH_SERVICE, COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';

@Module({
  imports: [
    RabbitMQClientModule.register('rabbit.authQueue', AUTH_SERVICE),
    RabbitMQClientModule.register('rabbit.coachDomainQueue', COACH_DOMAIN_SERVICE),
  ],
  controllers: [TraineeController],
  providers: [TraineeService],
})
export class TraineeModule { }
