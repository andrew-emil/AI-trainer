import { PartialType } from '@nestjs/mapped-types';
import { CreateNutritionMealDto } from './create-nutrition-meal.dto';

export class UpdateNutritionMealDto extends PartialType(CreateNutritionMealDto) {}
