import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { CreateTrainerDto } from './create-trainer.dto';

export class UpdateTrainerDto extends PartialType(CreateTrainerDto) {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsNumber()
    @IsOptional()
    ratingAvg?: number;

    @IsNumber()
    @IsOptional()
    ratingCount?: number;
}
