import { IsOptional, IsUUID } from "class-validator";

export class ProgressiveOverloadPayload {
    @IsUUID()
    traineeId: string;

    @IsUUID()
    @IsOptional()
    exerciseId?: string;

    @IsUUID()
    @IsOptional()
    dayId?: string;
}