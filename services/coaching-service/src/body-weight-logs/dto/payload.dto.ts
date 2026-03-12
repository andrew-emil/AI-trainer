import { IsNotEmpty, IsUUID } from "class-validator";

export class PayloadDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsUUID()
    traineeId: string;
}