import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { COACH_DOMAIN_QUEUE, INTERACTION_QUEUE } from 'src/common/constants/rabbitNames.constants';
import { RabbitProducerService } from './rabbit-producer.service';

@Module({
  providers: [RabbitProducerService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: COACH_DOMAIN_QUEUE,
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('rabbit.url')!],
            queue: configService.get<string>('rabbit.coachDomainQueue'),
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: INTERACTION_QUEUE,
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('rabbit.url')!],
            queue: configService.get<string>('rabbit.interactionQueue'),
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [RabbitProducerService],
})
export class RabbitProducerModule { }
