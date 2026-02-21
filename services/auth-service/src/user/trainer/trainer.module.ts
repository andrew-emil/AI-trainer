import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { CloudinaryProvider } from 'src/common/providers/cloudinary.provider';

@Module({
  controllers: [TrainerController],
  providers: [TrainerService, CloudinaryProvider],
  exports: [TrainerService]
})
export class TrainerModule { }
