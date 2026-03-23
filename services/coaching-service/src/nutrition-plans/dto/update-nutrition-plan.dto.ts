import { PartialType } from '@nestjs/mapped-types';
import { CreateNutritionPlanDto } from './create-nutrition-plan.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateNutritionPlanDto extends PartialType(CreateNutritionPlanDto) {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    trainerId: string;
}
