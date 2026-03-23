import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateNutritionDayDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  dayIndex: number;
}
