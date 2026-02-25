import { PartialType } from '@nestjs/swagger';
import { RegisterAsTrainerDto } from 'src/auth/dto/registerAsTrainer.dto';

export class UpdateTrainerDto extends PartialType(RegisterAsTrainerDto) {}
