import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import rabbitConfig, { rabbitSchema } from './config/rabbit.config';
import { DatabaseModule } from './database/database.module';
import { Conversation, ConversationSchema } from './models/conversation.model';
import { EmailQueue, EmailQueueSchema } from './models/emailQueue.model';
import { Message, MessageSchema } from './models/message.model';
import { Notification, NotificationSchema } from './models/notification.model';
import { NotificationModule } from './notification/notification.module';
import { RabbitProducerModule } from './rabbit-producer/rabbit-producer.module';

// Repositories
import { ConversationRepo } from './repos/conversation.repo';
import { MessageRepo } from './repos/message.repo';
import { NotificationRepo } from './repos/notification.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: Message.name, schema: MessageSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: EmailQueue.name, schema: EmailQueueSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object()
        .concat(rabbitSchema),
      load: [rabbitConfig]
    }),
    DatabaseModule,
    NotificationModule,
    RabbitProducerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConversationRepo,
    MessageRepo,
    NotificationRepo,
  ],
  exports: [
    ConversationRepo,
    MessageRepo,
    NotificationRepo
  ]
})
export class AppModule { }
