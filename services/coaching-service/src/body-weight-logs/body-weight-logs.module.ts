import { Module } from '@nestjs/common';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';
import { INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { TrainerMetricsModule } from 'src/trainer-metrics/trainer-metrics.module';
import { BodyWeightLogsController } from './body-weight-logs.controller';
import { BodyWeightLogsService } from './body-weight-logs.service';
import { AnalysisProvider } from './providers/analysis.provider';

@Module({
  controllers: [BodyWeightLogsController],
  providers: [BodyWeightLogsService, AnalysisProvider],
  imports: [
    ActivityLogModule,
    TrainerMetricsModule,
    RabbitMQClientModule.register("rabbit.interactionQueue", INTERACTION_SERVICE)
  ]
})
export class BodyWeightLogsModule { }
