import { Module } from '@nestjs/common';
import { BodyWeightLogsService } from './body-weight-logs.service';
import { BodyWeightLogsController } from './body-weight-logs.controller';
import { AnalysisProvider } from './providers/analysis.provider';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { COACH_DOMAIN_SERVICE, INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';

@Module({
  controllers: [BodyWeightLogsController],
  providers: [BodyWeightLogsService, AnalysisProvider],
  imports: [
    RabbitMQClientModule.register('rabbit.coachDomainQueue', COACH_DOMAIN_SERVICE),
    RabbitMQClientModule.register('rabbit.interactionQueue', INTERACTION_SERVICE)
  ]
})
export class BodyWeightLogsModule { }
