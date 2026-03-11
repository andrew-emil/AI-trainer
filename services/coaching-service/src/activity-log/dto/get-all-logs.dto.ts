import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";

export class GetAllLogsDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsOptional()
    @IsNumber()
    page: number;

    @IsOptional()
    @IsNumber()
    limit: number;
}