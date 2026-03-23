import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';
import { ITrainerApplicationApprovedResponse, ITrainerApplicationRejectResponse, TrainerApplicationRejectResponseSchema, TrainerApplicationResponseSchema } from 'src/common/contracts/trainerApplication';
import { TrainerApplicationPatterns } from 'src/common/patterns/trainerApplicationPatterns.enum';
import { rpcCall } from 'src/common/utils/rpc-call.util';
import { TrainerAccountRejectDto } from 'src/mails/dto/trainerAccountReject.dto';
import { MailsService } from 'src/mails/mails.service';

@Injectable()
export class AdminService {
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly client: ClientProxy,
        private readonly mailsService: MailsService,
        private readonly configService: ConfigService
    ) { }

    getTrainerRequests() {
        return firstValueFrom(
            this.client.send(TrainerApplicationPatterns.GET_ALL_TRAINER_APPLICATIONS, {})
        )
    }

    getTrainerRequestById(id: string) {
        return firstValueFrom(
            this.client.send(TrainerApplicationPatterns.GET_TRAINER_APPLICATION_BY_ID, { id })
        )
    }

    async approveTrainerRequest(id: string) {
        const { user } = await rpcCall<ITrainerApplicationApprovedResponse>(
            this.client,
            TrainerApplicationPatterns.ACCEPT_TRAINER_APPLICATION,
            { id },
            TrainerApplicationResponseSchema
        )
        const frontend = this.configService.getOrThrow<string>("FRONTEND_URL")
        const loginLink = `${frontend}/login`
        this.mailsService.
            handleTrainerApprove({ email: user.email, userName: user.username, loginLink })

        return { message: "Trainer Account Approved Successfully" }
    }

    async rejectTrainerRequest(id: string, adminNote?: string) {
        const { user, ...rest } = await rpcCall<ITrainerApplicationRejectResponse>(
            this.client,
            TrainerApplicationPatterns.REJECT_TRAINER_APPLICATION,
            { id, adminNote },
            TrainerApplicationRejectResponseSchema
        )
        const frontend = this.configService.getOrThrow<string>("FRONTEND_URL")
        const registerLink = `${frontend}/register`
        const trainerRejectDto: TrainerAccountRejectDto = {
            email: user.email,
            username: user.username,
            rejectionReason: rest.adminNote,
            reapplyLink: registerLink
        }
        this.mailsService.handleTrainerReject(trainerRejectDto)

        return { message: "Trainer Account Rejected Successfully" }
    }

    deleteTrainerRequest(id: string) {
        this.client.emit(TrainerApplicationPatterns.DELETE_TRAINER_APPLICATION, { id })
        return true
    }
}
