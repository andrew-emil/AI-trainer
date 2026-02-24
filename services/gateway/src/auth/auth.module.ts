import { Module } from '@nestjs/common';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  imports: [
    RabbitMQClientModule.register('rabbit.authQueue', AUTH_SERVICE.toString()),
  ]
})

export class AuthModule { }
