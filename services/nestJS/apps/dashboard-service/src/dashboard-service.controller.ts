import { Controller, Get } from '@nestjs/common';
import { DashboardServiceService } from './dashboard-service.service';

@Controller()
export class DashboardServiceController {
  constructor(private readonly dashboardServiceService: DashboardServiceService) {}

  @Get()
  getHello(): string {
    return this.dashboardServiceService.getHello();
  }
}
