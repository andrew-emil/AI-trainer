import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ResetPasswordDto } from 'src/auth/dto/resetPassword.dto';
import { INTERACTION_SERVICE } from 'src/common/constants/clientModuleNames';
import { MailPattern } from 'src/common/patterns/mail.pattern';
import { TrainerAccountApproveDto } from './dto/trainerAccountApprove.dto';
import { TrainerAccountRejectDto } from './dto/trainerAccountReject.dto';

@Injectable()
export class MailsService {
    constructor(
        @Inject(INTERACTION_SERVICE)
        private readonly client: ClientProxy
    ) { }

    handleResetPassword(dto: ResetPasswordDto) {
        this.client.emit(MailPattern.RESET_PASSWORD, dto)
    }

    handleTrainerApprove(dto: TrainerAccountApproveDto) {
        this.client.emit(MailPattern.TRAINER_ACCOUNT_APPROVE, dto)
    }

    handleTrainerReject(dto: TrainerAccountRejectDto) {
        this.client.emit(MailPattern.TRAINER_ACCOUNT_REJECT, dto)
    }
}
