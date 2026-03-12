import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentDto } from './create-equipment.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
