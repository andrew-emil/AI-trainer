import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({})
export class RabbitMQClientModule {
    static register(queueKey: string, name: string): DynamicModule {
        return {
            module: RabbitMQClientModule,
            imports: [
                ClientsModule.registerAsync([
                    {
                        name,
                        imports: [ConfigModule],
                        useFactory: async (configService: ConfigService) => {
                            const url = configService.get<string>('rabbit.url');
                            const queue = configService.get<string>(queueKey);

                            if (!url || !queue) {
                                throw new Error('RabbitMQ config missing');
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
                            };
                        },
                        inject: [ConfigService],
                    },
                ]),
            ],
            exports: [ClientsModule],
        };
    }
}