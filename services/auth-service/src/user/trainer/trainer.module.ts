import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { CloudinaryProvider } from 'src/common/providers/cloudinary.provider';
import { UserModule } from '../user.module';

@Module({
  controllers: [TrainerController],
  providers: [TrainerService, CloudinaryProvider],
  exports: [TrainerService],
  imports: [UserModule]
})
export class TrainerModule { }
