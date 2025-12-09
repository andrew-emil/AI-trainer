import { Module } from '@nestjs/common';
import { DashboardServiceController } from './dashboard-service.controller';
import { DashboardServiceService } from './dashboard-service.service';

@Module({
  imports: [],
  controllers: [DashboardServiceController],
  providers: [DashboardServiceService],
})
export class DashboardServiceModule {}
