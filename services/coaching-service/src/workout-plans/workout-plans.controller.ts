import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WorkoutPlansService } from './workout-plans.service';
import { WorkoutPlanPatterns } from 'src/common/patterns/workout-plan.pattern';
import { CreateWorkoutPlanDto } from './dto/create-workout-plan.dto';
import { UpdateWorkoutPlanDto } from './dto/update-workout-plan.dto';
import { CreateWorkoutDayDto } from './dto/create-workout-day.dto';
import { UpdateWorkoutDayDto } from './dto/update-workout-day.dto';
import { CreateWorkoutDayExerciseDto } from './dto/create-workout-day-exercise.dto';
import { UpdateWorkoutDayExerciseDto } from './dto/update-workout-day-exercise.dto';

@Controller()
export class WorkoutPlansController {
  constructor(private readonly workoutPlansService: WorkoutPlansService) {}

  // ---------- Plans ----------

  @MessagePattern(WorkoutPlanPatterns.CREATE_PLAN)
  createPlan(@Payload() dto: CreateWorkoutPlanDto) {
    return this.workoutPlansService.createPlan(dto);
  }

  @MessagePattern(WorkoutPlanPatterns.FIND_ALL_PLANS)
  findAllPlans() {
    return this.workoutPlansService.findAllPlans();
  }

  @MessagePattern(WorkoutPlanPatterns.FIND_BY_ID)
  findPlanById(@Payload() { id }: { id: string }) {
    return this.workoutPlansService.findPlanById(id);
  }

  @MessagePattern(WorkoutPlanPatterns.FIND_BY_TRAINER)
  findPlansByTrainer(@Payload() { trainerId }: { trainerId: string }) {
    return this.workoutPlansService.findPlansByTrainer(trainerId);
  }

  @MessagePattern(WorkoutPlanPatterns.UPDATE_PLAN)
  updatePlan(@Payload() { id, trainerId, ...dto }: UpdateWorkoutPlanDto & { trainerId: string }) {
    return this.workoutPlansService.updatePlan(id, dto, trainerId);
  }

  @MessagePattern(WorkoutPlanPatterns.DELETE_PLAN)
  deletePlan(@Payload() { id, trainerId }: { id: string; trainerId: string }) {
    return this.workoutPlansService.deletePlan(id, trainerId);
  }

  // ---------- Days ----------

  @MessagePattern(WorkoutPlanPatterns.ADD_DAY)
  addDay(
    @Payload() { planId, trainerId, ...dto }: CreateWorkoutDayDto & { planId: string; trainerId: string },
  ) {
    return this.workoutPlansService.addDay(planId, dto, trainerId);
  }

  @MessagePattern(WorkoutPlanPatterns.FIND_DAYS_BY_PLAN)
  findDaysByPlan(@Payload() { planId }: { planId: string }) {
    return this.workoutPlansService.findDaysByPlan(planId);
  }

  @MessagePattern(WorkoutPlanPatterns.FIND_DAY_BY_ID)
  findDayById(@Payload() { dayId }: { dayId: string }) {
    return this.workoutPlansService.findDayById(dayId);
  }

  @MessagePattern(WorkoutPlanPatterns.UPDATE_DAY)
  updateDay(
    @Payload() { dayId, trainerId, ...dto }: UpdateWorkoutDayDto & { trainerId: string },
  ) {
    return this.workoutPlansService.updateDay(dayId, dto, trainerId);
  }

  @MessagePattern(WorkoutPlanPatterns.DELETE_DAY)
  deleteDay(@Payload() { dayId, trainerId }: { dayId: string; trainerId: string }) {
    return this.workoutPlansService.deleteDay(dayId, trainerId);
  }

  // ---------- Day Exercises ----------

  @MessagePattern(WorkoutPlanPatterns.ADD_EXERCISE_TO_DAY)
  addExerciseToDay(
    @Payload() { dayId, trainerId, ...dto }: CreateWorkoutDayExerciseDto & { dayId: string; trainerId: string },
  ) {
    return this.workoutPlansService.addExerciseToDay(dayId, dto, trainerId);
  }

  @MessagePattern(WorkoutPlanPatterns.UPDATE_DAY_EXERCISE)
  updateDayExercise(
    @Payload() { id, trainerId, ...dto }: UpdateWorkoutDayExerciseDto & { trainerId: string },
  ) {
    return this.workoutPlansService.updateDayExercise(id, dto, trainerId);
  }

  @MessagePattern(WorkoutPlanPatterns.DELETE_DAY_EXERCISE)
  deleteDayExercise(@Payload() { id, trainerId }: { id: string; trainerId: string }) {
    return this.workoutPlansService.deleteDayExercise(id, trainerId);
  }
}
