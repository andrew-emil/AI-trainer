import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterAsTrainerDto } from 'src/auth/dto/registerAsTrainer.dto';
import { AUTH_SERVICE, COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { NutritionPlanAssignmentPattern } from 'src/common/patterns/nutrition-plan-assignment.pattern';
import { ReviewPattern } from 'src/common/patterns/reviews.patterns';
import { TrainerMetricsPattern } from 'src/common/patterns/trainer-metrics.dto';
import { TrainerTraineePattern } from 'src/common/patterns/trainer-trainee.pattern';
import { TrainerPattern } from 'src/common/patterns/trainerPatterns.enum';
import { WorkoutAssignmentPattern } from 'src/common/patterns/workout-assignment.pattern';
import { CreateTraineeNutritionPlanDto } from './dto/create-trainee-nutrition-plan.dto';
import { CreateTraineeWorkoutPlanDto } from './dto/create-trainee-workout-plan.dto';
import { CreatedTrainer } from './dto/createdTrainerResponse.dto';
import { UpdateTraineeNutritionPlanDto } from './dto/update-trainee-nutrition-plan.dto';
import { UpdateTraineeWorkoutPlanDto } from './dto/update-trainee-workout-plan.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Injectable()
export class TrainerService {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: ClientProxy,
    @Inject(COACH_DOMAIN_SERVICE)
    private readonly coachDomainService: ClientProxy,
  ) { }

  create(dto: RegisterAsTrainerDto) {
    return firstValueFrom<CreatedTrainer>(
      this.authService.send(
        TrainerPattern.CREATE,
        { ...dto }
      )
    )
  }

  findAll(isActive?: boolean) {
    if (isActive) {
      return firstValueFrom(
        this.authService.send(
          TrainerPattern.GET_ALL_ACTIVE,
          {}
        )
      )
    }
    return firstValueFrom(
      this.authService.send(
        TrainerPattern.GET_ALL,
        {}
      )
    )
  }

  async findOne(id: string) {
    const trainer = await firstValueFrom(
      this.authService.send(
        TrainerPattern.GET_BY_ID,
        { userId: id }
      )
    )
    return trainer;
  }

  update(id: string, updateTrainerDto: UpdateTrainerDto) {
    return firstValueFrom(
      this.authService.send(
        TrainerPattern.UPDATE,
        { userId: id, ...updateTrainerDto }
      )
    )
  }

  remove(id: string) {
    this.authService.emit(
      TrainerPattern.DELETE,
      { userId: id }
    )
    return true;
  }

  // ------------------- Trainee Assignment -----------------------
  getTraineeRequests(trainerId: string) {
    return firstValueFrom(
      this.coachDomainService.send(
        TrainerTraineePattern.GET_TRAINEE_REQUESTS,
        { trainerId }
      )
    )
  }

  processTraineeRequest(reqId: string, approve: boolean) {
    return firstValueFrom(
      this.coachDomainService.send(
        TrainerTraineePattern.PROCESS_TRAINEE_REQUEST,
        { requestId: reqId, approve }
      )
    )
  }

  getAssignedTrainees(trainerId: string) {
    return firstValueFrom(
      this.coachDomainService.send(
        TrainerTraineePattern.GET_ASSIGNED_TRAINEES,
        { trainerId }
      )
    )
  }

  unassignTrainee(trainerId: string, traineeId: string) {
    return firstValueFrom(
      this.coachDomainService.send(
        TrainerTraineePattern.UNASSIGN_TRAINEE,
        { trainerId, traineeId }
      )
    )
  }

  // ------------------- Workout Plan Assignment Logic -----------------------
  assignWorkoutPlan(dto: CreateTraineeWorkoutPlanDto) {
    return firstValueFrom(
      this.coachDomainService.send(
        WorkoutAssignmentPattern.ASSIGN_PLAN,
        dto
      )
    );
  }

  updateWorkoutPlanAssignment(traineeId: string, planId: string, dto: UpdateTraineeWorkoutPlanDto) {
    return firstValueFrom(
      this.coachDomainService.send(
        WorkoutAssignmentPattern.UPDATE_ASSIGNMENT,
        { traineeId, id: planId, ...dto }
      )
    );
  }

  setWorkoutPlanActiveStatus(traineeId: string, planId: string, active: boolean) {
    return firstValueFrom(
      this.coachDomainService.send(
        WorkoutAssignmentPattern.SET_ACTIVE_STATUS,
        { traineeId, planId, active }
      )
    );
  }

  getAssignedWorkoutPlanForTrainee(traineeId: string, active?: boolean) {
    return firstValueFrom(
      this.coachDomainService.send(
        WorkoutAssignmentPattern.GET_TRAINEE_ASSIGNED_PLAN,
        { traineeId, active }
      )
    );
  }

  getAllTraineesAndTheirAssignedPlans(trainerId: string) {
    return firstValueFrom(
      this.coachDomainService.send(
        WorkoutAssignmentPattern.GET_ALL_TRAINEES_PLANS,
        { trainerId }
      )
    );
  }

  unassignWorkoutPlan(traineeId: string, planId: string) {
    return firstValueFrom(
      this.coachDomainService.send(
        WorkoutAssignmentPattern.UNASSIGN_PLAN,
        { traineeId, planId }
      )
    );
  }

  // ------------------- Nutrition Plan Assignment Logic -----------------------
  assignNutritionPlan(dto: CreateTraineeNutritionPlanDto) {
    return firstValueFrom(
      this.coachDomainService.send(
        NutritionPlanAssignmentPattern.ASSIGN_PLAN,
        dto
      )
    );
  }

  updateNutritionPlanAssignment(traineeId: string, nutritionPlanId: string, dto: UpdateTraineeNutritionPlanDto) {
    return firstValueFrom(
      this.coachDomainService.send(
        NutritionPlanAssignmentPattern.UPDATE_ASSIGNMENT,
        { traineeId, nutritionPlanId, ...dto }
      )
    );
  }

  setNutritionPlanActiveStatus(traineeId: string, nutritionPlanId: string, active: boolean) {
    return firstValueFrom(
      this.coachDomainService.send(
        NutritionPlanAssignmentPattern.SET_ACTIVE_STATUS,
        { traineeId, nutritionPlanId, active }
      )
    );
  }

  getAssignedNutritionPlanForTrainee(traineeId: string, active?: boolean) {
    return firstValueFrom(
      this.coachDomainService.send(
        NutritionPlanAssignmentPattern.GET_TRAINEE_ASSIGNED_PLAN,
        { traineeId, active }
      )
    );
  }

  getAllTraineesAndTheirAssignedNutritionPlans(trainerId: string) {
    return firstValueFrom(
      this.coachDomainService.send(
        NutritionPlanAssignmentPattern.GET_ALL_TRAINEES_PLANS,
        { trainerId }
      )
    );
  }

  unassignNutritionPlan(traineeId: string, nutritionPlanId: string) {
    return firstValueFrom(
      this.coachDomainService.send(
        NutritionPlanAssignmentPattern.UNASSIGN_PLAN,
        { traineeId, nutritionPlanId }
      )
    );
  }

  // ------------------- calculate trainer rank -----------------
  calculateTrainerRank(trainerId: string) {
    return firstValueFrom(
      this.coachDomainService.send(
        TrainerMetricsPattern.CALCULATE_RANK_SCORE,
        { trainerId }
      )
    )
  }

  // ------------------- Reviews -----------------------
  getReviewsForTrainer(trainerId: string) {
    return firstValueFrom(
      this.coachDomainService.send(
        ReviewPattern.GET_FOR_TRAINER,
        { trainerId }
      )
    )
  }
}
