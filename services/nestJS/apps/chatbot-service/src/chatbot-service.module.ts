import { RMQ_TOKENS } from '@app/contracts/tokens';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from "@nestjs/mongoose";
import Joi from 'joi';
import { ChatbotServiceController } from './chatbot-service.controller';
import { ChatbotServiceService } from './chatbot-service.service';
import chatbotConfig, { chatbotConfigSchema } from './config/chatbot.config';
import databaseConfig, { databaseConfigSchema } from './config/database.config';
import rabbitmqConfig, { rabbitmqSchema } from './config/rabbitmq.config';
import { Conversation, ConversationSchema } from './entity/conversation.entity';
import { HistoryModule } from './history/history.module';
import { RedisProvider } from './providers/redis.provider';
import { join } from 'path';
import { Queues } from '@app/contracts/queue';

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
        // 1) service-specific .env (when running from compiled dist/)
        join(__dirname, '..', '.env'),
        // 2) service-specific .env relative to project root (when running via ts-node/nest-cli from root)
        'apps/chatbot-service/.env',
        // 3) root .env as global fallback
        '.env',
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("database.host"),
        dbName: configService.get<string>("database.name")
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    ClientsModule.registerAsync([
      {
        name: RMQ_TOKENS.CHAT_OUTGOING_CLIENT,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('rabbitmq.uri')!],
            queue: Queues.CHATBOT_SERVICE_QUEUE_OUTGOING,
            queueOptions: { durable: true },
          },
        }),
      },
    ]),
    HistoryModule
  ],
  controllers: [ChatbotServiceController],
  providers: [ChatbotServiceService, RedisProvider],
})
export class ChatbotServiceModule { }
