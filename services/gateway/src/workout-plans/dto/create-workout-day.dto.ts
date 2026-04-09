import { IsInt, IsString, Min } from 'class-validator';

export class CreateWorkoutDayDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  dayIndex: number;
}
