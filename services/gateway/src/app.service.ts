import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    HealthCheckService,
    HealthCheck,
    MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
    constructor(
        private readonly health: HealthCheckService,
        private readonly microservice: MicroserviceHealthIndicator,
        private readonly configService: ConfigService,
    ) {}

    @HealthCheck()
    checkHealth() {
        const url = this.configService.get<string>('rabbit.url')!;

        const coachQueue = this.configService.get<string>('rabbit.coachDomainQueue')!;
        const interactionQueue = this.configService.get<string>('rabbit.interactionQueue')!;
        const authQueue = this.configService.get<string>('rabbit.authQueue')!;

        return this.health.check([
            () =>
                this.microservice.pingCheck('rabbitmq-coach', {
                    transport: Transport.RMQ,
                    options: { urls: [url], queue: coachQueue },
                }),
            () =>
                this.microservice.pingCheck('rabbitmq-interaction', {
                    transport: Transport.RMQ,
                    options: { urls: [url], queue: interactionQueue },
                }),
            () =>
                this.microservice.pingCheck('rabbitmq-auth', {
                    transport: Transport.RMQ,
                    options: { urls: [url], queue: authQueue },
                }),
        ]);
    }
}
