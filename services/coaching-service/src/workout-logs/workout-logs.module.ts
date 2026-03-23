import { Module } from '@nestjs/common';
import { AUTH_SERVICE, INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { TrainerMetricsModule } from 'src/trainer-metrics/trainer-metrics.module';
import { WorkoutLogsHelper } from './providers/workout-logs.helper';
import { WorkoutLogsController } from './workout-logs.controller';
import { WorkoutLogsService } from './workout-logs.service';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';

@Module({
  controllers: [WorkoutLogsController],
  providers: [WorkoutLogsService, WorkoutLogsHelper],
  imports: [
    TrainerMetricsModule,
    ActivityLogModule,
    RabbitMQClientModule.register("rabbit.interactionQueue", INTERACTION_SERVICE),
    RabbitMQClientModule.register("rabbit.authQueue", AUTH_SERVICE),
  ]
})
export class WorkoutLogsModule { }
