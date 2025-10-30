import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WorkoutModule } from './workout.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WorkoutModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3003
      }
    }
  )

  await app.listen()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();