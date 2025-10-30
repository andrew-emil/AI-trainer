import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { StreamServiceModule } from './stream-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StreamServiceModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3002
      }
    }
  )

  await app.listen()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();