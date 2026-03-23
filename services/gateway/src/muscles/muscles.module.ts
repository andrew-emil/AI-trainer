import { Module } from '@nestjs/common';
import { MusclesService } from './muscles.service';
import { MusclesController } from './muscles.controller';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';

@Module({
  controllers: [MusclesController],
  providers: [MusclesService],
  imports: [
    RabbitMQClientModule.register("rabbit.coachDomainQueue", COACH_DOMAIN_SERVICE)
  ]
})
export class MusclesModule {}
