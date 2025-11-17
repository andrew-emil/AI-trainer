import { Module } from '@nestjs/common';
import { ChatbotGateway } from './chatbot.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_TOKENS } from '@app/contracts/tokens';
import { ChatbotController } from './chatbot.controller';

@Module({
  providers: [ChatbotGateway],
  imports: [
    // in chatbot service module
    ClientsModule.register([
      {
        name: RMQ_TOKENS.CHAT_OUTGOING_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL as string || "amqp://localhost:5672"],
          queue: 'gateway.chatbot.outgoing.queue', // <- same queue as gateway
          queueOptions: { durable: true },
        },
      },
    ]),

  ],
  controllers: [ChatbotController]
})
export class ChatbotModule {}
