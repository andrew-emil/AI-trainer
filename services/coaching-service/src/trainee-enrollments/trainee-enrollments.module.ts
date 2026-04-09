import { Module } from '@nestjs/common';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';
import { AUTH_SERVICE, INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { TraineeEnrollmentsController } from './trainee-enrollments.controller';
import { TraineeEnrollmentsService } from './trainee-enrollments.service';

@Module({
  imports: [
    ActivityLogModule,
    RabbitMQClientModule.register("rabbit.authQueue", AUTH_SERVICE),
    RabbitMQClientModule.register("rabbit.interactionQueue", INTERACTION_SERVICE),
  ],
  controllers: [TraineeEnrollmentsController],
  providers: [TraineeEnrollmentsService],
})
export class TraineeEnrollmentsModule { }
