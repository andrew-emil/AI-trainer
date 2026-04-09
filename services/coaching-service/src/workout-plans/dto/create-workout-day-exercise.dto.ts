import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { IsLessThanOrEqual } from "src/common/decorators/is-less-than-or-equal.decorator";

export class CreateWorkoutDayExerciseDto {
  @IsString()
  exerciseId: string;

  @IsInt()
  @Min(1)
  sets: number;

  @IsInt()
  @Min(1)
  @IsLessThanOrEqual("repsMax")
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
