import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutDayExerciseDto } from './create-workout-day-exercise.dto';

export class UpdateWorkoutDayExerciseDto extends PartialType(CreateWorkoutDayExerciseDto) {}
