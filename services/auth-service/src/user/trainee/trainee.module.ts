import { Module } from '@nestjs/common';
import { UserModule } from '../user.module';
import { TraineeController } from './trainee.controller';
import { TraineeService } from './trainee.service';

@Module({
  controllers: [TraineeController],
  providers: [TraineeService],
  imports: [UserModule],
  exports: [TraineeService]
})
export class TraineeModule { }
