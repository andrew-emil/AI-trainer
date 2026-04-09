import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NutritionPlanAssignmentPattern } from 'src/common/patterns/nutrition-plan-assignment.pattern';
import { CreateTraineeNutritionPlanDto } from './dto/create-trainee-nutrition-plan.dto';
import { UpdateTraineeNutritionPlanDto } from './dto/update-trainee-nutrition-plan.dto';
import { NutritionPlanAssignmentService } from './nutrition-plan-assignment.service';

@Controller()
export class NutritionPlanAssignmentController {
  constructor(private readonly nutritionPlanAssignmentService: NutritionPlanAssignmentService) { }

  @MessagePattern(NutritionPlanAssignmentPattern.ASSIGN_PLAN)
  assignNutritionPlan(@Payload() dto: CreateTraineeNutritionPlanDto) {
    return this.nutritionPlanAssignmentService.assignNutritionPlan(dto);
  }

  @MessagePattern(NutritionPlanAssignmentPattern.UPDATE_ASSIGNMENT)
  updateNutritionPlanAssignment(@Payload() data: { traineeId: string; } & UpdateTraineeNutritionPlanDto) {
    return this.nutritionPlanAssignmentService.updateNutritionPlanAssignment(data.traineeId, data);
  }

  @MessagePattern(NutritionPlanAssignmentPattern.SET_ACTIVE_STATUS)
  setNutritionPlanActiveStatus(@Payload() data: { traineeId: string; nutritionPlanId: string; active: boolean }) {
    return this.nutritionPlanAssignmentService.setNutritionPlanActiveStatus(data.traineeId, data.nutritionPlanId, data.active);
  }

  @MessagePattern(NutritionPlanAssignmentPattern.GET_TRAINEE_ASSIGNED_PLAN)
  getAssignedNutritionPlanForTrainee(@Payload() data: { traineeId: string; status?: boolean }) {
    return this.nutritionPlanAssignmentService.getAssignedNutritionPlanForTrainee(data.traineeId, data.status);
  }

  @MessagePattern(NutritionPlanAssignmentPattern.GET_ALL_TRAINEES_PLANS)
  getAllTraineesAndTheirAssignedNutritionPlans(@Payload() data: { trainerId: string }) {
    return this.nutritionPlanAssignmentService.getAllTraineesAndTheirAssignedNutritionPlans(data.trainerId);
  }

  @MessagePattern(NutritionPlanAssignmentPattern.UNASSIGN_PLAN)
  unassignNutritionPlan(@Payload() data: { traineeId: string; nutritionPlanId: string }) {
    return this.nutritionPlanAssignmentService.unassignNutritionPlan(data.traineeId, data.nutritionPlanId);
  }
}
