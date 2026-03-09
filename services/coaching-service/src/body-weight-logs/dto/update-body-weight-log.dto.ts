import { PartialType } from '@nestjs/mapped-types';
import { CreateBodyWeightLogDto } from './create-body-weight-log.dto';

export class UpdateBodyWeightLogDto extends PartialType(CreateBodyWeightLogDto) {
  id: number;
}
