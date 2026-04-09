import { IsInt, IsNotEmpty, IsUUID, Min } from "class-validator";

export class CreateEnrollmentDto {
    @IsUUID()
    @IsNotEmpty()
    traineeId: string;

    @IsUUID()
    @IsNotEmpty()
    trainerId: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    sessionsCount: number;
}
