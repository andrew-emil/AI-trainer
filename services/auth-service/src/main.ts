import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL ?? "amqp://admin:admin123@rabbitmq:5672"],
      queue: 'auth_service',
      queueOptions: {
        durable: false,
      },
    },
  });
  // const app = await NestFactory.create(AppModule);

  await app.listen();
}

bootstrap().catch(console.error);
