import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
