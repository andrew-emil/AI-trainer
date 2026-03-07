import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';
import { TrainerApplicationPatterns } from 'src/common/patterns/trainerApplicationPatterns.enum';
import { MailsService } from 'src/mails/mails.service';

@Injectable()
export class AdminService {
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly client: ClientProxy,
        private readonly mailsService: MailsService
    ) { }

    getTrainerRequests() {
        return this.client.send(TrainerApplicationPatterns.GET_ALL_TRAINER_APPLICATIONS, {})
    }

    getTrainerRequestById(id: string) {
        return this.client.send(TrainerApplicationPatterns.GET_TRAINER_APPLICATION_BY_ID, { id })
    }

    async approveTrainerRequest(id: string) {
        const result = await firstValueFrom(
            this.client.send(TrainerApplicationPatterns.ACCEPT_TRAINER_APPLICATION, { id })
        )
        return result
        //TODO: send mail to trainer
    }

    rejectTrainerRequest(id: string, adminNote?: string) {
        //TODO: send mail to trainer
        return this.client.send(TrainerApplicationPatterns.REJECT_TRAINER_APPLICATION, { id, adminNote })
    }

    deleteTrainerRequest(id: string) {
        this.client.emit(TrainerApplicationPatterns.DELETE_TRAINER_APPLICATION, { id })
        return true
    }
}
