import { IsDateString, IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator'

export class CreateTraineeWorkoutPlanDto {
  @IsString()
  @IsUUID()
  planId: string

  @IsString()
  @IsUUID()
  traineeId: string

  @IsDateString()
  startDate: string

  @IsOptional()
  @IsDateString()
  endDate?: string

  @IsOptional()
  @IsBoolean()
  active?: boolean
}
