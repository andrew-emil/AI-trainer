import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL as string],
      queue: process.env.INTERACTION_QUEUE as string,
      queueOptions: {
                durable: true,
            },
    },
  });

  await app.listen();
}

bootstrap().catch(console.error);
