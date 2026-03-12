import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';

@Module({
  controllers: [EquipmentsController],
  providers: [EquipmentsService],
  imports: [
    RabbitMQClientModule.register('rabbit.coachDomainQueue', COACH_DOMAIN_SERVICE)
  ]
})
export class EquipmentsModule {}
