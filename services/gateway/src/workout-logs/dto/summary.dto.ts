import { IsEnum, IsOptional, IsString, IsUUID } from "class-validator";

export class SummaryPayload {
    @IsUUID()
    traineeId: string;

    @IsEnum({ by: ["dayId", "exerciseId"] })
    by?: ("dayId" | "exerciseId")[];

    @IsUUID()
    @IsOptional()
    dayId?: string;

    @IsString()
    @IsOptional()
    startDate?: string;

    @IsString()
    @IsOptional()
    endDate?: string;
}
