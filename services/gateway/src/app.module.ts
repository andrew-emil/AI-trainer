import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrainerModule } from './trainer/trainer.module';
import { TraineeModule } from './trainee/trainee.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, TrainerModule, TraineeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
