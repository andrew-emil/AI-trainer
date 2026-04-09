import { IsInt, IsNotEmpty, IsUUID, Min } from "class-validator";

export class CreateTrainerRequestDto {
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
