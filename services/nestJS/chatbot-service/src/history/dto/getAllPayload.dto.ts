import { IsNotEmpty, IsUUID } from "class-validator";

export class GetAllPayloadDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string
}