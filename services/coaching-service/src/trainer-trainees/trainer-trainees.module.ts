import { Module } from '@nestjs/common';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';
import { AUTH_SERVICE, INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { TrainerMetricsModule } from 'src/trainer-metrics/trainer-metrics.module';
import { TrainerTraineesController } from './trainer-trainees.controller';
import { TrainerTraineesService } from './trainer-trainees.service';

@Module({
  imports: [
    ActivityLogModule,
    TrainerMetricsModule,
    RabbitMQClientModule.register("rabbit.interactionQueue", INTERACTION_SERVICE),
    RabbitMQClientModule.register("rabbit.authQueue", AUTH_SERVICE)
  ],
  controllers: [TrainerTraineesController],
  providers: [TrainerTraineesService],
})
export class TrainerTraineesModule { }
