import { PartialType } from '@nestjs/mapped-types';
import { CreateBodyPartDto } from './create-body-part.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateBodyPartDto extends PartialType(CreateBodyPartDto) {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}