import { Module } from '@nestjs/common';
import { TrainerModule } from './trainer/trainer.module';
import { TraineeModule } from './trainee/trainee.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TrainerModule, TraineeModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
