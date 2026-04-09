import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WorkoutAssignmentPattern } from 'src/common/patterns/workout-assignment.pattern';
import { CreateTraineeWorkoutPlanDto } from './dto/create-trainee-workout-plan.dto';
import { UpdateTraineeWorkoutPlanDto } from './dto/update-trainee-workout-plan.dto';
import { WorkoutAssignmentService } from './workout-assignment.service';

@Controller()
export class WorkoutAssignmentController {
  constructor(private readonly workoutAssignmentService: WorkoutAssignmentService) {}

  @MessagePattern(WorkoutAssignmentPattern.ASSIGN_PLAN)
  assignWorkoutPlan(@Payload() dto: CreateTraineeWorkoutPlanDto) {
    return this.workoutAssignmentService.assignWorkoutPlan(dto);
  }

  @MessagePattern(WorkoutAssignmentPattern.UPDATE_ASSIGNMENT)
  updateWorkoutPlanAssignment(@Payload() data: { traineeId: string; dto: UpdateTraineeWorkoutPlanDto }) {
    return this.workoutAssignmentService.updateWorkoutPlanAssignment(data.traineeId, data.dto);
  }

  @MessagePattern(WorkoutAssignmentPattern.SET_ACTIVE_STATUS)
  setWorkoutPlanActiveStatus(@Payload() data: { traineeId: string; planId: string; active: boolean }) {
    return this.workoutAssignmentService.setWorkoutPlanActiveStatus(data.traineeId, data.planId, data.active);
  }

  @MessagePattern(WorkoutAssignmentPattern.GET_TRAINEE_ASSIGNED_PLAN)
  getAssignedWorkoutPlanForTrainee(@Payload() data: { traineeId: string; status?: boolean }) {
    return this.workoutAssignmentService.getAssignedWorkoutPlanForTrainee(data.traineeId, data.status);
  }

  @MessagePattern(WorkoutAssignmentPattern.GET_ALL_TRAINEES_PLANS)
  getAllTraineesAndTheirAssignedPlans(@Payload() data: { trainerId: string }) {
    return this.workoutAssignmentService.getAllTraineesAndTheirAssignedPlans(data.trainerId);
  }

  @MessagePattern(WorkoutAssignmentPattern.UNASSIGN_PLAN)
  unassignWorkoutPlan(@Payload() data: { traineeId: string; planId: string }) {
    return this.workoutAssignmentService.unassignWorkoutPlan(data.traineeId, data.planId);
  }
}
