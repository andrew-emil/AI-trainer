import { Module } from '@nestjs/common';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  imports: [
    RabbitMQClientModule.register('rabbit.authQueue', AUTH_SERVICE),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  exports: [JwtModule]
})

export class AuthModule { }
