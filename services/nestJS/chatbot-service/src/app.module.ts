import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import Joi from 'joi';
import { join } from 'path';
import { ChatbotModule } from './chatbot/chatbot.module';
import chatbotConfig, { chatbotConfigSchema } from './config/chatbot.config';
import databaseConfig, { databaseConfigSchema } from './config/database.config';
import rabbitmqConfig, { rabbitmqSchema } from './config/rabbitmq.config';
import { HistoryModule } from './history/history.module';
import { RedisProvider } from './providers/redis.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi
        .object()
        .concat(databaseConfigSchema)
        .concat(chatbotConfigSchema)
        .concat(rabbitmqSchema)
      ,
      load: [databaseConfig, chatbotConfig, rabbitmqConfig],
      envFilePath: [
        join(__dirname, '..', '.env'),
        'apps/chatbot-service/.env',
        '.env',
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get<string>("database.host"));
        return {
          uri: configService.get<string>("database.host"),
          dbName: configService.get<string>("database.name")
        }
      },
      inject: [ConfigService]
    }),
    ChatbotModule,
    HistoryModule
  ],
  providers: [RedisProvider],
})
export class AppModule { }
