import { Controller, Get } from '@nestjs/common';
import { WorkoutService } from './workout.service';

@Controller()
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get()
  getHello(): string {
    return this.workoutService.getHello();
  }
}
