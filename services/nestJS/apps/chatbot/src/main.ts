import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ChatbotModule } from './chatbot.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ChatbotModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001
      }
    }
  )

  await app.listen()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();