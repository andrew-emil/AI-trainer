import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateTrainerDto } from './create-trainer.dto';

export class UpdateTrainerDto extends PartialType(CreateTrainerDto) {
    @IsUUID()
    userId: string;
}
