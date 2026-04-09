import { Module } from '@nestjs/common';
import { NutritionPlanService } from './nutrition-plan.service';
import { NutritionPlansController } from './nutrition-plan.controller';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';

@Module({
  controllers: [NutritionPlansController],
  providers: [NutritionPlanService],
  imports: [
    RabbitMQClientModule.register('rabbit.coachDomainQueue', COACH_DOMAIN_SERVICE)
  ]
})
export class NutritionPlanModule {}
