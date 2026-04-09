import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateWorkoutDayExerciseDto {
  @IsString()
  exerciseId: string;

  @IsInt()
  @Min(1)
  sets: number;

  @IsInt()
  @Min(1)
  repsMin: number;

  @IsInt()
  @Min(1)
  repsMax: number;

  @IsOptional()
  @IsInt()
  restSeconds?: number;

  @IsInt()
  @Min(1)
  orderIndex: number;
}
