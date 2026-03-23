import {
  IsString,
  IsInt,
  IsOptional,
  IsNumber,
  IsDateString,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateWorkoutSetDto {
  @IsInt()
  setNumber: number;

  @IsInt()
  reps: number;

  @IsNumber()
  weight: number;

  @IsOptional()
  @IsNumber()
  rir?: number;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsInt()
  restAfter?: number;
}
export class CreateWorkoutExerciseDto {
  @IsString()
  exerciseId: string;

  @IsInt()
  order: number;

  @IsDateString()
  startedAt: string; // REQUIRED

  @IsOptional()
  @IsDateString()
  finishedAt?: string;

  @IsOptional()
  @IsInt()
  totalRest?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutSetDto)
  sets: CreateWorkoutSetDto[];
}

export class CreateWorkoutSessionDto {
  @IsString()
  dayId: string;

  @IsDateString()
  startedAt: string; // REQUIRED

  @IsOptional()
  @IsDateString()
  finishedAt?: string;

  @IsOptional()
  @IsInt()
  totalDuration?: number;

  @IsOptional()
  @IsInt()
  totalRestTime?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutExerciseDto)
  exercises: CreateWorkoutExerciseDto[];
}
