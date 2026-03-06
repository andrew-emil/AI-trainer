import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import rabbitConfig, { rabbitSchema } from './config/rabbit.config';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { NotificationModule } from './notification/notification.module';
import { RabbitProducerModule } from './rabbit-producer/rabbit-producer.module';
import { ReposModule } from './repos/repos.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object()
        .concat(rabbitSchema),
      load: [rabbitConfig]
    }),
    DatabaseModule,
    NotificationModule,
    RabbitProducerModule,
    MailModule,
    ReposModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
