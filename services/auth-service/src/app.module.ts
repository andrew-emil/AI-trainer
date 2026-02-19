import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HashingModule } from './common/hashing/hashing.module';
import { HashingService } from './common/hashing/hashing.service';

@Module({
  imports: [AuthModule, UserModule, HashingModule],
  providers: [HashingService],
})
export class AppModule {}
