import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutDayDto } from './create-workout-day.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateWorkoutDayDto extends PartialType(CreateWorkoutDayDto) {
    @IsUUID()
    @IsNotEmpty()
    dayId: string
}
