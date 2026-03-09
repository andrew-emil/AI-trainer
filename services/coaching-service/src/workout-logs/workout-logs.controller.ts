import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WorkoutLogsService } from './workout-logs.service';
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto';
import { UpdateWorkoutLogDto } from './dto/update-workout-log.dto';

@Controller()
export class WorkoutLogsController {
  constructor(private readonly workoutLogsService: WorkoutLogsService) {}

  @MessagePattern('createWorkoutLog')
  create(@Payload() createWorkoutLogDto: CreateWorkoutLogDto) {
    return this.workoutLogsService.create(createWorkoutLogDto);
  }

  @MessagePattern('findAllWorkoutLogs')
  findAll() {
    return this.workoutLogsService.findAll();
  }

  @MessagePattern('findOneWorkoutLog')
  findOne(@Payload() id: number) {
    return this.workoutLogsService.findOne(id);
  }

  @MessagePattern('updateWorkoutLog')
  update(@Payload() updateWorkoutLogDto: UpdateWorkoutLogDto) {
    return this.workoutLogsService.update(updateWorkoutLogDto.id, updateWorkoutLogDto);
  }

  @MessagePattern('removeWorkoutLog')
  remove(@Payload() id: number) {
    return this.workoutLogsService.remove(id);
  }
}
