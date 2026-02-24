import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RpcToHttpExceptionFilter } from './common/filters/rpc-to-http-exception.filter';
import jwtConfig, { jwtSchema } from './config/jwt.config';
import rabbitConfig, { rabbitSchema } from './config/rabbit.config';
import { RabbitMQClientModule } from './rabbitmq-client/rabbitmq-client.module';
import { TraineeModule } from './trainee/trainee.module';
import { TrainerModule } from './trainer/trainer.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object()
        .concat(rabbitSchema)
        .concat(jwtSchema),
      load: [rabbitConfig, jwtConfig],
    }),
    UserModule, TrainerModule, TraineeModule, AuthModule, RabbitMQClientModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: RpcToHttpExceptionFilter },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    }
  ],
})
export class AppModule { }
