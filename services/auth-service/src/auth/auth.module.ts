import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenProvider } from './providers/token.provider';
import { UserModule } from 'src/user/user.module';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { TrainerModule } from 'src/user/trainer/trainer.module';
import { TraineeModule } from 'src/user/trainee/trainee.module';
import { RabbitProducerModule } from 'src/rabbit-producer/rabbit-producer.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenProvider],
  imports: [
    UserModule,
    HashingModule,
    TrainerModule,
    TraineeModule,
    RabbitProducerModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("jwt.secret"),
      }),
    })
  ],
})
export class AuthModule { }
