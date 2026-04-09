import { Module } from '@nestjs/common';
import { WorkoutAssignmentService } from './workout-assignment.service';
import { WorkoutAssignmentController } from './workout-assignment.controller';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { AUTH_SERVICE, INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';

@Module({
  controllers: [WorkoutAssignmentController],
  providers: [WorkoutAssignmentService],
  imports: [
    RabbitMQClientModule.register('rabbit.authQueue', AUTH_SERVICE),
    RabbitMQClientModule.register('rabbit.interactionQueue', INTERACTION_SERVICE),
  ]
})
export class WorkoutAssignmentModule {}
