import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateWorkoutDayExerciseDto } from './create-workout-day-exercise.dto';

export class UpdateWorkoutDayExerciseDto extends PartialType(CreateWorkoutDayExerciseDto) {
    @IsUUID()
    @IsNotEmpty()
    id: string
}