import { PartialType } from '@nestjs/mapped-types'
import { CreateNutritionDayFoodDto } from './create-nutrition-day-food.dto'
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateNutritionDayFoodDto extends PartialType(CreateNutritionDayFoodDto) {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    trainerId: string;
  }
