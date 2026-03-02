import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { COACH_DOMAIN_QUEUE, INTERACTION_QUEUE } from 'src/common/constants/rabbitNames.constants';

@Injectable()
export class RabbitProducerService implements OnModuleDestroy {
    private readonly logger = new Logger(RabbitProducerService.name);
    constructor(
        @Inject(COACH_DOMAIN_QUEUE)
        private readonly coachDomainQueue: ClientProxy,
        @Inject(INTERACTION_QUEUE)
        private readonly interactionQueue: ClientProxy,
    ) { }

    async onModuleDestroy() {
        this.logger.log("Closing RabbitMQ connections...");
        await this.coachDomainQueue.close();
        await this.interactionQueue.close();
    }

    async sendPatternToCoachDomain<T = any>(pattern: string, payload: any): Promise<T> {
        const obs = this.coachDomainQueue.send<T, any>(pattern, payload);
        return await lastValueFrom(obs);
    }

    emitPatternToCoachDomain(pattern: string, payload: any) {
        return this.coachDomainQueue.emit(pattern, payload);
    }

    async sendPatternToInteractionDomain<T = any>(pattern: string, payload: any): Promise<T> {
        const obs = this.interactionQueue.send<T, any>(pattern, payload);
        return await lastValueFrom(obs);
    }

    emitPatternToInteractionDomain(pattern: string, payload: any) {
        return this.interactionQueue.emit(pattern, payload);
    }
}
