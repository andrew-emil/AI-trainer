import { IsNumber, IsOptional, Min } from "class-validator";
import { Transform } from "class-transformer";

export class PaginationDto {
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Transform(({ value }) => value ?? 1)
    page: number = 1;

    @IsNumber()
    @IsOptional()
    @Min(1)
    @Transform(({ value }) => value ?? 50)
    limit: number = 50;
}