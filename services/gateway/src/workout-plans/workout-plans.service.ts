import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { WorkoutPlanPatterns } from 'src/common/patterns/workout-plan.pattern';
import { CreateWorkoutPlanDto } from './dto/create-workout-plan.dto';
import { UpdateWorkoutPlanDto } from './dto/update-workout-plan.dto';
import { CreateWorkoutDayDto } from './dto/create-workout-day.dto';
import { UpdateWorkoutDayDto } from './dto/update-workout-day.dto';
import { CreateWorkoutDayExerciseDto } from './dto/create-workout-day-exercise.dto';
import { UpdateWorkoutDayExerciseDto } from './dto/update-workout-day-exercise.dto';

@Injectable()
export class WorkoutPlansService {
  constructor(
    @Inject(COACH_DOMAIN_SERVICE)
    private readonly coachDomainClient: ClientProxy,
  ) {}

  // ---------- Plans ----------

  createPlan(trainerId: string, dto: CreateWorkoutPlanDto) {
    return this.coachDomainClient.send(WorkoutPlanPatterns.CREATE_PLAN, { trainerId, ...dto });
  }

  findAllPlans() {
    return this.coachDomainClient.send(WorkoutPlanPatterns.FIND_ALL_PLANS, {});
  }

  findPlanById(id: string) {
    return this.coachDomainClient.send(WorkoutPlanPatterns.FIND_BY_ID, { id });
  }

  findPlansByTrainer(trainerId: string) {
    return this.coachDomainClient.send(WorkoutPlanPatterns.FIND_BY_TRAINER, { trainerId });
  }

  updatePlan(id: string, dto: UpdateWorkoutPlanDto, trainerId: string) {
    return this.coachDomainClient.send(WorkoutPlanPatterns.UPDATE_PLAN, { id, ...dto, trainerId });
  }

  deletePlan(id: string, trainerId: string) {
    return this.coachDomainClient.send(WorkoutPlanPatterns.DELETE_PLAN, { id, trainerId });
  }

  // ---------- Days ----------

  addDay(planId: string, dto: CreateWorkoutDayDto, trainerId: string) {
    return this.coachDomainClient.send(WorkoutPlanPatterns.ADD_DAY, { planId, trainerId, ...dto });
  }

  findDaysByPlan(planId: string) {
    return this.coachDomainClient.send(WorkoutPlanPatterns.FIND_DAYS_BY_PLAN, { planId });
  }

  findDayById(dayId: string) {
    return this.coachDomainClient.send(WorkoutPlanPatterns.FIND_DAY_BY_ID, { dayId });
  }

  updateDay(dayId: string, dto: UpdateWorkoutDayDto, trainerId: string) {
    return this.coachDomainClient.send(WorkoutPlanPatterns.UPDATE_DAY, { dayId, ...dto, trainerId });
  }

  deleteDay(dayId: string, trainerId: string) {
    return this.coachDomainClient.send(WorkoutPlanPatterns.DELETE_DAY, { dayId, trainerId });
  }

  // ---------- Day Exercises ----------

  addExerciseToDay(dayId: string, dto: CreateWorkoutDayExerciseDto, trainerId: string) {
    return this.coachDomainClient.send(WorkoutPlanPatterns.ADD_EXERCISE_TO_DAY, { dayId, trainerId, ...dto });
  }

  updateDayExercise(id: string, dto: UpdateWorkoutDayExerciseDto, trainerId: string) {
    return this.coachDomainClient.send(WorkoutPlanPatterns.UPDATE_DAY_EXERCISE, { id, ...dto, trainerId });
  }

  deleteDayExercise(id: string, trainerId: string) {
    return this.coachDomainClient.send(WorkoutPlanPatterns.DELETE_DAY_EXERCISE, { id, trainerId });
  }
}
