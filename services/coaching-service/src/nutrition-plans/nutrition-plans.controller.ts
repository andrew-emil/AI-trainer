import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { NutritionPlanPatterns } from "src/common/patterns/nutrition-plan.pattern";
import { CreateNutritionDayFoodDto } from "./dto/create-nutrition-day-food.dto";
import { CreateNutritionDayDto } from "./dto/create-nutrition-day.dto";
import { CreateNutritionMealDto } from "./dto/create-nutrition-meal.dto";
import { CreateNutritionPlanDto } from "./dto/create-nutrition-plan.dto";
import { UpdateNutritionDayFoodDto } from "./dto/update-nutrition-day-food.dto";
import { UpdateNutritionMealDto } from "./dto/update-nutrition-meal.dto";
import { UpdateNutritionPlanDto } from "./dto/update-nutrition-plan.dto";
import { NutritionPlansService } from "./nutrition-plans.service";


@Controller()
export class NutritionPlansController {
  constructor(private readonly service: NutritionPlansService) { }

  // ---------- Plans ----------
  @MessagePattern(NutritionPlanPatterns.CREATE_PLAN)
  createPlan(@Payload() dto: CreateNutritionPlanDto) {
    return this.service.createPlan(dto.traineeId, dto);
  }

  @MessagePattern(NutritionPlanPatterns.FIND_BY_TRAINER)
  findPlansByTrainer(@Payload() dto: Pick<CreateNutritionPlanDto, "traineeId">) {
    return this.service.findPlansByTrainer(dto.traineeId);
  }

  // admin can see all plans
  @MessagePattern(NutritionPlanPatterns.FIND_ALL_PLANS)
  findAllPlans() {
    return this.service.findAllPlans();
  }

  @MessagePattern(NutritionPlanPatterns.FIND_BY_ID)
  findPlanById(@Payload() { id }: { id: string }) {
    return this.service.findPlanById(id);
  }

  @MessagePattern(NutritionPlanPatterns.UPDATE_PLAN)
  updatePlan(@Payload() dto: UpdateNutritionPlanDto) {
    return this.service.updatePlan(dto.id, dto, dto.trainerId);
  }

  @MessagePattern(NutritionPlanPatterns.DELETE_PLAN)
  deletePlan(@Payload() dto: Pick<UpdateNutritionPlanDto, "id" | "trainerId">) {
    return this.service.deletePlan(dto.id, dto.trainerId);
  }

  // ---------- Days ----------
  @MessagePattern(NutritionPlanPatterns.CREATE_DAY)
  addDay(@Payload() dto: CreateNutritionDayDto) {
    return this.service.addDay(dto.planId, dto, dto.trainerId);
  }


  @MessagePattern(NutritionPlanPatterns.FIND_DAYS_BY_PLAN)
  findDaysByPlan(@Payload() { planId }: Pick<CreateNutritionDayDto, "planId">) {
    return this.service.findDaysByPlan(planId);
  }

  @MessagePattern(NutritionPlanPatterns.UPDATE_DAY)
  updateDay(@Payload() dto: CreateNutritionDayDto) {
    return this.service.updateDay(dto.id, dto, dto.trainerId);
  }

  @MessagePattern(NutritionPlanPatterns.DELETE_DAY)
  deleteDay(@Payload() dto: Pick<CreateNutritionDayDto, "id" | "trainerId">) {
    return this.service.deleteDay(dto.id, dto.trainerId);
  }

  // ---------- Meals ----------
  @MessagePattern(NutritionPlanPatterns.CREATE_MEAL)
  addMeal(@Payload() dto: CreateNutritionMealDto) {
    return this.service.addMeal(dto, dto.trainerId);
  }

  @MessagePattern(NutritionPlanPatterns.FIND_MEALS_BY_DAY)
  findMealsByDay(@Payload() { nutritionDayId }: Pick<CreateNutritionMealDto, "nutritionDayId">) {
    return this.service.findMealsByDay(nutritionDayId);
  }

  @MessagePattern(NutritionPlanPatterns.UPDATE_MEAL)
  updateMeal(@Payload() dto: UpdateNutritionMealDto) {
    return this.service.updateMeal(dto.id, dto, dto.trainerId);
  }

  @MessagePattern(NutritionPlanPatterns.DELETE_MEAL)
  deleteMeal(@Payload() dto: Pick<UpdateNutritionMealDto, "id" | "trainerId">) {
    return this.service.deleteMeal(dto.id, dto.trainerId);
  }

  // ---------- Meal Foods ----------
  @MessagePattern(NutritionPlanPatterns.CREATE_FOOD)
  addFoodToMeal(@Payload() dto: CreateNutritionDayFoodDto) {
    return this.service.addFoodToMeal(dto, dto.trainerId);
  }

  @MessagePattern(NutritionPlanPatterns.UPDATE_FOOD)
  updateMealFood(@Payload() dto: UpdateNutritionDayFoodDto) {
    return this.service.updateMealFood(dto.id, dto, dto.trainerId);
  }

  @MessagePattern(NutritionPlanPatterns.DELETE_FOOD)
  deleteMealFood(@Payload() dto: Pick<UpdateNutritionDayFoodDto, "id" | "trainerId">) {
    return this.service.deleteMealFood(dto.id, dto.trainerId);
  }
}
