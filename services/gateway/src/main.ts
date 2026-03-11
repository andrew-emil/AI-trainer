import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './socket-io.adapter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL as string],
            queue: process.env.GATEWAY_QUEUE as string,
            queueOptions: {
                durable: false,
            },
        },
    })
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    });
    app.use(cookieParser());
    app.enableShutdownHooks();

    const configService = app.get(ConfigService);
    app.useWebSocketAdapter(new SocketIoAdapter(app, configService));

    await app.startAllMicroservices()
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(console.error);
