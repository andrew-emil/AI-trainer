import { Module } from '@nestjs/common';
import { ActivityLogModule } from 'src/activity-log/activity-log.module';
import { BodyWeightLogsController } from './body-weight-logs.controller';
import { BodyWeightLogsService } from './body-weight-logs.service';
import { AnalysisProvider } from './providers/analysis.provider';

@Module({
  controllers: [BodyWeightLogsController],
  providers: [BodyWeightLogsService, AnalysisProvider],
  imports: [ActivityLogModule]
})
export class BodyWeightLogsModule { }
