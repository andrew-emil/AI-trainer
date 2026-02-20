import { Module } from '@nestjs/common';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { CloudinaryProvider } from 'src/common/providers/cloudinary.provider';
import { TraineeModule } from './trainee/trainee.module';
import { TrainerModule } from './trainer/trainer.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TrainerModule, TraineeModule, HashingModule],
  controllers: [UserController],
  providers: [UserService, CloudinaryProvider],
  exports: [UserService],
})
export class UserModule {}
