import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';
import { NutritionPlanPatterns } from 'src/common/patterns/nutrition-plan.pattern';
import { CreateNutritionDayFoodDto } from './dto/create-nutrition-day-food.dto';
import { CreateNutritionDayDto } from './dto/create-nutrition-day.dto';
import { CreateNutritionMealDto } from './dto/create-nutrition-meal.dto';
import { CreateNutritionPlanDto } from './dto/create-nutrition-plan.dto';
import { UpdateNutritionDayFoodDto } from './dto/update-nutrition-day-food.dto';
import { UpdateNutritionMealDto } from './dto/update-nutrition-meal.dto';
import { UpdateNutritionPlanDto } from './dto/update-nutrition-plan.dto';


@Injectable()
export class NutritionPlanService {
    constructor(
        @Inject(COACH_DOMAIN_SERVICE)
        private readonly coachDomainClient: ClientProxy,
    ) { }

    createPlan(trainerId: string, createNutritionPlanDto: CreateNutritionPlanDto) {
        return this.coachDomainClient.send(NutritionPlanPatterns.CREATE_PLAN, { trainerId, ...createNutritionPlanDto });
    }

    findAllPlans() {
        return this.coachDomainClient.send(NutritionPlanPatterns.FIND_ALL_PLANS, {});
    }

    findPlanById(id: string) {
        return this.coachDomainClient.send(NutritionPlanPatterns.FIND_BY_ID, { id });
    }

    findPlansByTrainer(trainerId: string) {
        return this.coachDomainClient.send(NutritionPlanPatterns.FIND_BY_TRAINER, { trainerId });
    }

    updatePlan(id: string, updateNutritionPlanDto: UpdateNutritionPlanDto, trainerId: string) {
        return this.coachDomainClient.send(NutritionPlanPatterns.UPDATE_PLAN, { id, ...updateNutritionPlanDto, trainerId });
    }

    deletePlan(id: string, trainerId: string) {
        return this.coachDomainClient.send(NutritionPlanPatterns.DELETE_PLAN, { id, trainerId });
    }

    // ---------- Days ----------
    addDay(planId: string, dto: CreateNutritionDayDto, trainerId: string) {
        return this.coachDomainClient.send(NutritionPlanPatterns.CREATE_DAY,
            { planId, trainerId, ...dto });
    }

    findDaysByPlan(planId: string) {
        return this.coachDomainClient.send(NutritionPlanPatterns.FIND_DAYS_BY_PLAN, { planId });
    }

    updateDay(dayId: string, dto: CreateNutritionDayDto, trainerId: string) {
        return this.coachDomainClient.send(NutritionPlanPatterns.UPDATE_DAY, { id: dayId, ...dto, trainerId });
    }

    deleteDay(dayId: string, trainerId: string) {
        return this.coachDomainClient.send(NutritionPlanPatterns.DELETE_DAY, { id: dayId, trainerId });
    }

    // ---------- Meals ----------
    addMeal(trainerId: string, dto: CreateNutritionMealDto) {
        return this.coachDomainClient.send(NutritionPlanPatterns.CREATE_MEAL, { trainerId, ...dto });
    }

    findMealsByDay(nutritionDayId: string) {
        return this.coachDomainClient.send(NutritionPlanPatterns.FIND_MEALS_BY_DAY, { nutritionDayId });
    }

    updateMeal(mealId: string, dto: UpdateNutritionMealDto, trainerId: string) {
        return this.coachDomainClient.send(NutritionPlanPatterns.UPDATE_MEAL, { id: mealId, ...dto, trainerId });
    }

    deleteMeal(mealId: string, trainerId: string) {
        return this.coachDomainClient.send(NutritionPlanPatterns.DELETE_MEAL, { id: mealId, trainerId });
    }

    // ---------- Meal Foods ----------
    addFoodToMeal(trainerId: string, dto: CreateNutritionDayFoodDto) {
        return this.coachDomainClient.send(NutritionPlanPatterns.CREATE_FOOD, { trainerId, ...dto });
    }

    updateMealFood(mealFoodId: string, dto: UpdateNutritionDayFoodDto, trainerId: string) {
        return this.coachDomainClient.send(NutritionPlanPatterns.UPDATE_FOOD, { id: mealFoodId, ...dto, trainerId });
    }

    deleteMealFood(mealFoodId: string, trainerId: string) {
        return this.coachDomainClient.send(NutritionPlanPatterns.DELETE_FOOD, { id: mealFoodId, trainerId });
    }
}
