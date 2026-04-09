import { Module } from '@nestjs/common';
import { AUTH_SERVICE, INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { NutritionPlanAssignmentController } from './nutrition-plan-assignment.controller';
import { NutritionPlanAssignmentService } from './nutrition-plan-assignment.service';

@Module({
  controllers: [NutritionPlanAssignmentController],
  providers: [NutritionPlanAssignmentService],
  imports: [
    RabbitMQClientModule.register('rabbit.authQueue', AUTH_SERVICE),
    RabbitMQClientModule.register('rabbit.interactionQueue', INTERACTION_SERVICE)
  ]
})
export class NutritionPlanAssignmentModule {}
