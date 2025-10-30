import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkoutService {
  getHello(): string {
    return 'Hello World!';
  }
}
