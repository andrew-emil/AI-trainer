import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
  imports: [
    RabbitMQClientModule.register("rabbit.coachDomainQueue", COACH_DOMAIN_SERVICE)
  ]
})
export class ExercisesModule {}
