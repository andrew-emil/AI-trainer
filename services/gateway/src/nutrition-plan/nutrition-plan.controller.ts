import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserRole } from "src/common/enums/entities.enum";
import type { CustomRequest } from "src/common/types/customRequest.type";
import { CreateNutritionDayFoodDto } from "./dto/create-nutrition-day-food.dto";
import { CreateNutritionDayDto } from "./dto/create-nutrition-day.dto";
import { CreateNutritionMealDto } from "./dto/create-nutrition-meal.dto";
import { CreateNutritionPlanDto } from "./dto/create-nutrition-plan.dto";
import { UpdateNutritionDayFoodDto } from "./dto/update-nutrition-day-food.dto";
import { UpdateNutritionMealDto } from "./dto/update-nutrition-meal.dto";
import { UpdateNutritionPlanDto } from "./dto/update-nutrition-plan.dto";
import { NutritionPlanService } from "./nutrition-plan.service";


@Controller("nutrition-plans")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.TRAINER, UserRole.ADMIN)
export class NutritionPlansController {
  constructor(private readonly service: NutritionPlanService) { }

  // ---------- Plans ----------

  @Post()
  createPlan(@Req() req: CustomRequest, @Body() dto: CreateNutritionPlanDto) {
    return this.service.createPlan(req.user.sub, dto);
  }

  @Get("trainer")
  findPlansByTrainer(@Req() req: CustomRequest) {
    return this.service.findPlansByTrainer(req.user.sub);
  }

  // admin can see all plans
  @Get()
  findAllPlans() {
    return this.service.findAllPlans();
  }

  @Roles(UserRole.TRAINEE)
  @Get(":id")
  findPlanById(@Param("id") id: string) {
    return this.service.findPlanById(id);
  }

  @Patch(":id")
  updatePlan(
    @Req() req: CustomRequest,
    @Param("id") id: string,
    @Body() dto: UpdateNutritionPlanDto,
  ) {
    return this.service.updatePlan(id, dto, req.user.sub);
  }


  @Delete(":id")
  deletePlan(@Param("id") id: string, @Req() req: CustomRequest) {
    return this.service.deletePlan(id, req.user.sub);
  }

  // ---------- Days ----------

  @Post(":planId/days")
  addDay(
    @Req() req: CustomRequest,
    @Param("planId") planId: string,
    @Body() dto: CreateNutritionDayDto,
  ) {
    return this.service.addDay(planId, dto, req.user.sub);
  }

  @Roles(UserRole.TRAINEE)
  @Get(":planId/days")
  findDaysByPlan(@Param("planId") planId: string) {
    return this.service.findDaysByPlan(planId);
  }


  @Patch("days/:dayId")
  updateDay(
    @Param("dayId") dayId: string,
    @Req() req: CustomRequest,
    @Body() dto: CreateNutritionDayDto,
  ) {
    return this.service.updateDay(dayId, dto, req.user.sub);
  }


  @Delete("days/:dayId")
  deleteDay(@Param("dayId") dayId: string, @Req() req: CustomRequest) {
    return this.service.deleteDay(dayId, req.user.sub as string);
  }

  // ---------- Meals ----------

  @Post("days/:dayId/meals")
  addMeal(
    @Param("dayId") dayId: string,
    @Body() dto: CreateNutritionMealDto,
    @Req() req: CustomRequest,
  ) {
    return this.service.addMeal(req.user.sub, { ...dto, nutritionDayId: dayId });
  }

  @Roles(UserRole.TRAINEE)
  @Get("days/:dayId/meals")
  findMealsByDay(@Param("dayId") dayId: string) {
    return this.service.findMealsByDay(dayId);
  }


  @Patch("meals/:mealId")
  updateMeal(
    @Param("mealId") mealId: string,
    @Body() dto: UpdateNutritionMealDto,
    @Req() req: CustomRequest,
  ) {
    return this.service.updateMeal(mealId, dto, req.user.sub);
  }


  @Delete("meals/:mealId")
  deleteMeal(@Param("mealId") mealId: string, @Req() req: CustomRequest) {
    return this.service.deleteMeal(mealId, req.user.sub);
  }

  // ---------- Meal Foods ----------

  @Post("meals/:mealId/foods")
  addFoodToMeal(
    @Param("mealId") mealId: string,
    @Body() dto: CreateNutritionDayFoodDto,
    @Req() req: CustomRequest,
  ) {
    return this.service.addFoodToMeal(req.user.sub, { ...dto, mealId });
  }


  @Patch("foods/:id")
  updateMealFood(
    @Param("id") id: string,
    @Body() dto: UpdateNutritionDayFoodDto,
    @Req() req: CustomRequest,
  ) {
    return this.service.updateMealFood(id, dto, req.user.sub);
  }


  @Delete("foods/:id")
  deleteMealFood(@Param("id") id: string, @Req() req: CustomRequest) {
    return this.service.deleteMealFood(id, req.user.sub);
  }
}
