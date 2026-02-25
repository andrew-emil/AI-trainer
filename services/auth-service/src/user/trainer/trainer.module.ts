import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { CloudinaryProvider } from 'src/common/providers/cloudinary.provider';
import { UserModule } from '../user.module';
import { TrainerApplicationsController } from './trainer-applications/trainer-applications.controller';
import { TrainerApplicationsProvider } from './providers/trainer-applications.provider';

@Module({
  controllers: [TrainerController, TrainerApplicationsController],
  providers: [TrainerService, CloudinaryProvider, TrainerApplicationsProvider],
  exports: [TrainerService],
  imports: [UserModule]
})
export class TrainerModule { }
