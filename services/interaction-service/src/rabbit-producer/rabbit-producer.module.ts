import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

@Module({})
export class RabbitProducerModule {
  static register(queueKey: string, name: string): DynamicModule {
    return {
      module: RabbitProducerModule,
      providers: [
        {
          provide: name,
          useFactory: (configService: ConfigService) => {
            const queue = configService.getOrThrow<string>(queueKey);
            const url = configService.getOrThrow<string>('rabbit.url');

            if (!url || !queue) {
              throw new Error('Rabbit URL or queue is not defined');
            }

            return {
              transport: Transport.RMQ,
              options: {
                urls: [url],
                queue,
                queueOptions: {
                  durable: true,
                },
              },
            }
          },
          inject: [ConfigService],
        },
      ],
      exports: [name],
    }

  }
}
