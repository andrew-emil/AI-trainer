import { PartialType } from '@nestjs/swagger';
import { RegisterAsTraineeDto } from 'src/auth/dto/registerAsTrainee.dto';

export class UpdateTraineeDto extends PartialType(RegisterAsTraineeDto) {}
