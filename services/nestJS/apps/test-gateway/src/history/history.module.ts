import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_TOKENS } from '@app/contracts/tokens';
import { Queues } from '@app/contracts/queue';

@Module({
  controllers: [HistoryController],
  imports: [
    ClientsModule.register([
      {
        name: RMQ_TOKENS.CHATBOT_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL as string || "amqp://localhost:5672"],
          queue: Queues.CHATBOT_SERVICE_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ]
})
export class HistoryModule {}
