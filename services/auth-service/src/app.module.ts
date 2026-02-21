import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { HashingModule } from './common/hashing/hashing.module';
import { HashingService } from './common/hashing/hashing.service';
import { CloudinaryProvider } from './common/providers/cloudinary.provider';
import jwtConfig, { jwtSchema } from './config/jwt.config';
import rabbitConfig, { rabbitSchema } from './config/rabbit.config';
import { PrismaModule } from './prisma/prisma.module';
import { RabbitProducerModule } from './rabbit-producer/rabbit-producer.module';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    UserModule,
    HashingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi
        .object()
        .concat(jwtSchema)
        .concat(rabbitSchema),
      load: [jwtConfig, rabbitConfig],
      envFilePath: ['.env', '.env.local'],
    }),
    PrismaModule,
    RabbitProducerModule,
  ],
  providers: [
    HashingService,
    CloudinaryProvider,
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
