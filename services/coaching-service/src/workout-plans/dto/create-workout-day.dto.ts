import { IsInt, IsString, Min } from "class-validator";

export class CreateWorkoutDayDto {
  @IsString()
  name: string; // Push / Pull / Legs / Rest

  @IsInt()
  @Min(0)
  dayIndex: number;
}
