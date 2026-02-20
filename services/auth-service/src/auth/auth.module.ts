import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenProvider } from './providers/token.provider';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenProvider],
  imports: [UserModule],
})
export class AuthModule {}
