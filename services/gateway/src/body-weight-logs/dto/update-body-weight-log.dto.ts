import { PartialType } from '@nestjs/swagger';
import { CreateBodyWeightLogDto } from './create-body-weight-log.dto';

export class UpdateBodyWeightLogDto extends PartialType(CreateBodyWeightLogDto) { }
