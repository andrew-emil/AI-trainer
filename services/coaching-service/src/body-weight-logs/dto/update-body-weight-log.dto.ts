import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateBodyWeightLogDto } from './create-body-weight-log.dto';

export class UpdateBodyWeightLogDto extends PartialType(CreateBodyWeightLogDto) {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  traineeId: string;
}
