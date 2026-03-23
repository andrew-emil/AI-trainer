import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { NutritionCalculator } from "src/common/utils/nutrition-calculator.helper";
import { CreateNutritionDayFoodDto } from "./dto/create-nutrition-day-food.dto";
import { CreateNutritionDayDto } from "./dto/create-nutrition-day.dto";
import { CreateNutritionMealDto } from "./dto/create-nutrition-meal.dto";
import { CreateNutritionPlanDto } from "./dto/create-nutrition-plan.dto";
import { UpdateNutritionDayFoodDto } from "./dto/update-nutrition-day-food.dto";
import { UpdateNutritionMealDto } from "./dto/update-nutrition-meal.dto";
import { UpdateNutritionPlanDto } from "./dto/update-nutrition-plan.dto";
import { FULL_PLAN_INCLUDE } from "./constants/full-plan-include.const";

@Injectable()
export class NutritionPlansService {
  constructor(private readonly prisma: PrismaService) { }

  // ─── Plans ────────────────────────────────────────────────────────────────
  createPlan(trainerId: string, dto: CreateNutritionPlanDto) {
    return this.prisma.nutritionPlan.create({
      data: { ...dto, trainerId },
    });
  }

  async findAllPlans() {
    const plans = await this.prisma.nutritionPlan.findMany({
      include: FULL_PLAN_INCLUDE,
    });
    return plans.map(NutritionCalculator.calcPlanTotals);
  }

  async findPlanById(id: string) {
    const plan = await this.prisma.nutritionPlan.findUnique({
      where: { id },
      include: FULL_PLAN_INCLUDE,
    });
    if (!plan) throw new NotFoundException("Nutrition plan not found");
    return NutritionCalculator.calcPlanTotals(plan);
  }

  async findPlansByTrainer(trainerId: string) {
    const plans = await this.prisma.nutritionPlan.findMany({
      where: { trainerId },
      include: FULL_PLAN_INCLUDE,
    });
    return plans.map(NutritionCalculator.calcPlanTotals);
  }

  updatePlan(id: string, dto: UpdateNutritionPlanDto, trainerId: string) {
    return this.prisma.nutritionPlan.update({
      where: { id, trainerId },
      data: dto,
    });
  }

  deletePlan(id: string, trainerId: string) {
    return this.prisma.nutritionPlan.delete({ where: { id, trainerId } });
  }

  // ─── Days ─────────────────────────────────────────────────────────────────

  async addDay(planId: string, dto: CreateNutritionDayDto, trainerId: string) {
    await this.assertPlanOwnership(planId, trainerId);
    return this.prisma.nutritionDay.create({ data: { ...dto, planId } });
  }

  async findDaysByPlan(planId: string) {
    const days = await this.prisma.nutritionDay.findMany({
      where: { planId },
      orderBy: { dayIndex: "asc" },
      include: {
        meals: {
          orderBy: { orderIndex: "asc" },
          include: {
            foods: {
              orderBy: { orderIndex: "asc" },
              include: { food: { include: { macros: true } } },
            },
          },
        },
      },
    });

    const daysWithTotals = days.map(NutritionCalculator.calcDayTotals);
    return {
      days: daysWithTotals,
      totals: this.aggregateTotals(daysWithTotals),
    };
  }

  async updateDay(dayId: string, dto: CreateNutritionDayDto, trainerId: string) {
    await this.assertPlanOwnership(dto.planId, trainerId);
    await this.assertDayExists(dayId);
    return this.prisma.nutritionDay.update({ where: { id: dayId }, data: dto });
  }

  async deleteDay(dayId: string, trainerId: string) {
    const day = await this.assertDayExists(dayId);
    await this.assertPlanOwnership(day.planId, trainerId);
    return this.prisma.nutritionDay.delete({ where: { id: dayId } });
  }

  // ─── Meals ────────────────────────────────────────────────────────────────

  async addMeal(dto: CreateNutritionMealDto, trainerId: string) {
    const day = await this.assertDayExists(dto.nutritionDayId);
    await this.assertPlanOwnership(day.planId, trainerId);
    return this.prisma.nutritionMeal.create({ data: dto });
  }

  async findMealsByDay(nutritionDayId: string) {
    const meals = await this.prisma.nutritionMeal.findMany({
      where: { nutritionDayId },
      orderBy: { orderIndex: "asc" },
      include: {
        foods: {
          orderBy: { orderIndex: "asc" },
          include: { food: { include: { macros: true } } },
        },
      },
    });
    return meals.map(NutritionCalculator.calcMealTotals);
  }

  async updateMeal(mealId: string, dto: UpdateNutritionMealDto, trainerId: string) {
    return this.prisma.$transaction(async (tx) => {
      await this.assertMealOwnership(tx, mealId, trainerId);

      const meal = await tx.nutritionMeal.findUniqueOrThrow({ where: { id: mealId } });

      // Swap orderIndex if it conflicts with another meal
      if (dto.orderIndex !== undefined && dto.orderIndex !== meal.orderIndex) {
        const conflicting = await tx.nutritionMeal.findFirst({
          where: { orderIndex: dto.orderIndex, nutritionDayId: meal.nutritionDayId },
        });
        if (conflicting) {
          await tx.nutritionMeal.update({
            where: { id: conflicting.id },
            data: { orderIndex: -1 }, // temp to avoid unique constraint
          });
          await tx.nutritionMeal.update({
            where: { id: mealId },
            data: dto,
          });
          await tx.nutritionMeal.update({
            where: { id: conflicting.id },
            data: { orderIndex: meal.orderIndex },
          });
          return tx.nutritionMeal.findUnique({ where: { id: mealId } });
        }
      }

      return tx.nutritionMeal.update({ where: { id: mealId }, data: dto });
    });
  }

  async deleteMeal(mealId: string, trainerId: string) {
    const meal = await this.assertMealExists(mealId);
    const day = await this.assertDayExists(meal.nutritionDayId);
    await this.assertPlanOwnership(day.planId, trainerId);
    return this.prisma.nutritionMeal.delete({ where: { id: mealId } });
  }

  // ─── Meal Foods ───────────────────────────────────────────────────────────

  async addFoodToMeal(dto: CreateNutritionDayFoodDto, trainerId: string) {
    const meal = await this.assertMealExists(dto.mealId);
    const day = await this.assertDayExists(meal.nutritionDayId);
    await this.assertPlanOwnership(day.planId, trainerId);
    return this.prisma.nutritionDayFood.create({ data: dto });
  }

  async updateMealFood(id: string, dto: UpdateNutritionDayFoodDto, trainerId: string) {
    const food = await this.assertMealFoodExists(id);
    const meal = await this.assertMealExists(food.mealId);
    const day = await this.assertDayExists(meal.nutritionDayId);
    await this.assertPlanOwnership(day.planId, trainerId);
    return this.prisma.nutritionDayFood.update({ where: { id }, data: dto });
  }

  async deleteMealFood(id: string, trainerId: string) {
    const food = await this.assertMealFoodExists(id);
    const meal = await this.assertMealExists(food.mealId);
    const day = await this.assertDayExists(meal.nutritionDayId);
    await this.assertPlanOwnership(day.planId, trainerId);
    return this.prisma.nutritionDayFood.delete({ where: { id } });
  }

  // ─── Private Guards ───────────────────────────────────────────────────────

  private async assertPlanOwnership(planId: string, trainerId: string) {
    const plan = await this.prisma.nutritionPlan.findUnique({ where: { id: planId } });
    if (!plan) throw new NotFoundException("Nutrition plan not found");
    if (plan.trainerId !== trainerId) throw new ForbiddenException("Access denied");
    return plan;
  }

  private async assertDayExists(dayId: string) {
    const day = await this.prisma.nutritionDay.findUnique({ where: { id: dayId } });
    if (!day) throw new NotFoundException("Nutrition day not found");
    return day;
  }

  private async assertMealExists(mealId: string) {
    const meal = await this.prisma.nutritionMeal.findUnique({ where: { id: mealId } });
    if (!meal) throw new NotFoundException("Nutrition meal not found");
    return meal;
  }

  private async assertMealFoodExists(id: string) {
    const food = await this.prisma.nutritionDayFood.findUnique({ where: { id } });
    if (!food) throw new NotFoundException("Meal food not found");
    return food;
  }

  private async assertMealOwnership(tx: any, mealId: string, trainerId: string) {
    const plan = await tx.nutritionPlan.findFirst({
      where: { days: { some: { meals: { some: { id: mealId } } } }, trainerId },
    });
    if (!plan) throw new ForbiddenException("Access denied");
    return plan;
  }

  private aggregateTotals(items: any[]) {
    const acc = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    for (const item of items) {
      acc.calories += item.totals.calories;
      acc.protein += item.totals.protein;
      acc.carbs += item.totals.carbs;
      acc.fat += item.totals.fat;
    }
    return Object.fromEntries(
      Object.entries(acc).map(([k, v]) => [k, Number(v.toFixed(2))])
    );
  }
}