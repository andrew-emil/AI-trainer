import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";

export class GetAllNotificationDto {
    @IsNumber()
    @IsOptional()
    limit: number;

    @IsNumber()
    @IsOptional()
    page: number;

    @IsUUID()
    @IsNotEmpty()
    userId: string;
}