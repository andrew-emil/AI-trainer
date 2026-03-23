import { PartialType } from '@nestjs/mapped-types';
import { CreateNutritionMealDto } from './create-nutrition-meal.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateNutritionMealDto extends PartialType(CreateNutritionMealDto) {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    trainerId: string;
}
