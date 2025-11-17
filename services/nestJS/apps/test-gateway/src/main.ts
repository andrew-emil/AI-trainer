import { NestFactory } from '@nestjs/core';
import { TestGatewayModule } from './test-gateway.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(TestGatewayModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL as string],
      queue: 'gateway.chatbot.outgoing.queue', // queue that chatbot's ClientProxy is publishing to
      queueOptions: { durable: true },
    },
  });
  console.log(process.env.RABBITMQ_URL)
  await app.startAllMicroservices();
  await app.listen(3000);
  console.log(`Gateway up on http://localhost:3000`);
}

bootstrap().catch(console.error);