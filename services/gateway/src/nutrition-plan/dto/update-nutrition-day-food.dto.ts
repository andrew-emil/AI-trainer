import { PartialType } from '@nestjs/mapped-types'
import { CreateNutritionDayFoodDto } from './create-nutrition-day-food.dto'

export class UpdateNutritionDayFoodDto extends PartialType(
  CreateNutritionDayFoodDto,
) {}
