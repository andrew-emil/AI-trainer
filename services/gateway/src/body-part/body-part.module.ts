import { Module } from '@nestjs/common';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { BodyPartController } from './body-part.controller';
import { BodyPartService } from './body-part.service';

@Module({
  controllers: [BodyPartController],
  providers: [BodyPartService],
  imports: [
    RabbitMQClientModule.register('rabbit.coachDomainQueue', COACH_DOMAIN_SERVICE),
  ]
})
export class BodyPartModule { }
