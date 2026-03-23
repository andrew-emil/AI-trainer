import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

export class CreateNutritionDayDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  planId: string;

  @IsUUID()
  trainerId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  dayIndex: number;
}
