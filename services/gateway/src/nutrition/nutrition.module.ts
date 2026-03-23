import { Module } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { NutritionController } from './nutrition.controller';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';

@Module({
  controllers: [NutritionController],
  providers: [NutritionService],
  imports: [
    RabbitMQClientModule.register("rabbit.coachDomainQueue", COACH_DOMAIN_SERVICE)
  ]
})
export class NutritionModule {}
