import { Module } from '@nestjs/common';
import { WorkoutLogsService } from './workout-logs.service';
import { WorkoutLogsController } from './workout-logs.controller';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';

@Module({
  controllers: [WorkoutLogsController],
  providers: [WorkoutLogsService],
  imports: [
    RabbitMQClientModule.register('rabbit.coachDomainQueue', COACH_DOMAIN_SERVICE)
  ]
})
export class WorkoutLogsModule { }
