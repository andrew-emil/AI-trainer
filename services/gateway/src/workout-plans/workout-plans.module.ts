import { Module } from '@nestjs/common';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { WorkoutPlansController } from './workout-plans.controller';
import { WorkoutPlansService } from './workout-plans.service';

@Module({
  imports: [
    RabbitMQClientModule.register('rabbit.coachDomainQueue', COACH_DOMAIN_SERVICE),
  ],
  controllers: [WorkoutPlansController],
  providers: [WorkoutPlansService],
})
export class WorkoutPlansModule {}
