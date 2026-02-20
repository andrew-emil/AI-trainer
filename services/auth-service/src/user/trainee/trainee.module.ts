import { Module } from '@nestjs/common';
import { UserModule } from '../user.module';
import { TraineeController } from './trainee.controller';
import { TraineeService } from './trainee.service';
import { RequestsProvider } from './providers/requests.provider';
import { UtilProvider } from './providers/util.provider';

@Module({
  controllers: [TraineeController],
  providers: [TraineeService, RequestsProvider, UtilProvider],
  imports: [UserModule],
})
export class TraineeModule {}
