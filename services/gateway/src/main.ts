import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

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
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.use(cookieParser());

    await app.startAllMicroservices()
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(console.error);
