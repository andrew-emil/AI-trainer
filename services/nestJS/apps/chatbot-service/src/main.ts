import { NestFactory } from '@nestjs/core';
import { ChatbotServiceModule } from './chatbot-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Queues } from '@app/contracts/queue';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ChatbotServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL as string || "amqp://localhost:5672"],
      queue: Queues.CHATBOT_SERVICE_QUEUE,
      queueOptions: {
        durable: true,
      },
      noAck: false,
      prefetchCount: parseInt(process.env.RABBITMQ_PREFETCH || '10', 10),
    },
  })
  console.log(process.env.RABBITMQ_URL)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  await app.listen()
}

bootstrap().catch(console.error);