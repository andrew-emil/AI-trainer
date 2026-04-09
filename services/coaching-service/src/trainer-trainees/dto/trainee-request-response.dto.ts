import { IsDate, IsInt, IsOptional, IsString, IsUUID } from "class-validator";

export class TraineeRequestResponseDto {
    @IsUUID()
    id: string;

    @IsUUID()
    trainerId: string;

    @IsUUID()
    traineeId: string;

    @IsString()
    traineeName: string;

    @IsInt()
    sessionsCount: number;

    @IsString()
    status: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    @IsOptional()
    respondedAt?: Date;

    constructor(partial: Partial<TraineeRequestResponseDto>) {
        Object.assign(this, partial);
    }
}
