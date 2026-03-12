import { Type } from "class-transformer";
import {
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsUUID
} from "class-validator";

export class CreateBodyWeightLogDto {
    @IsUUID()
    @IsNotEmpty()
    traineeId: string;

    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @IsOptional()
    @IsNumber()
    smm?: number;

    @IsOptional()
    @IsNumber()
    pbf?: number;

    @Type(() => Date)
    @IsDate()
    loggedAt: Date;
}
