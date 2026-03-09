import { Module } from '@nestjs/common';
import { BodyWeightLogsService } from './body-weight-logs.service';
import { BodyWeightLogsController } from './body-weight-logs.controller';

@Module({
  controllers: [BodyWeightLogsController],
  providers: [BodyWeightLogsService],
})
export class BodyWeightLogsModule {}
