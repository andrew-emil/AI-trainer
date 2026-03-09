import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WorkoutPlansService } from './workout-plans.service';
import { CreateWorkoutPlanDto } from './dto/create-workout-plan.dto';
import { UpdateWorkoutPlanDto } from './dto/update-workout-plan.dto';

@Controller()
export class WorkoutPlansController {
  constructor(private readonly workoutPlansService: WorkoutPlansService) {}

  @MessagePattern('createWorkoutPlan')
  create(@Payload() createWorkoutPlanDto: CreateWorkoutPlanDto) {
    return this.workoutPlansService.create(createWorkoutPlanDto);
  }

  @MessagePattern('findAllWorkoutPlans')
  findAll() {
    return this.workoutPlansService.findAll();
  }

  @MessagePattern('findOneWorkoutPlan')
  findOne(@Payload() id: number) {
    return this.workoutPlansService.findOne(id);
  }

  @MessagePattern('updateWorkoutPlan')
  update(@Payload() updateWorkoutPlanDto: UpdateWorkoutPlanDto) {
    return this.workoutPlansService.update(updateWorkoutPlanDto.id, updateWorkoutPlanDto);
  }

  @MessagePattern('removeWorkoutPlan')
  remove(@Payload() id: number) {
    return this.workoutPlansService.remove(id);
  }
}
