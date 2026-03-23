import { Controller } from '@nestjs/common';
import { WorkoutLogsService } from './workout-logs.service';

@Controller('workout-logs')
export class WorkoutLogsController {
  constructor(private readonly workoutLogsService: WorkoutLogsService) {}
}
