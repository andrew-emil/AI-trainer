import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutPlanDto } from './create-workout-plan.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateWorkoutPlanDto extends PartialType(CreateWorkoutPlanDto) {
    @IsUUID()
    @IsNotEmpty()
    id: string;
}
