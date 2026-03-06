import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { QueueEmailCommand } from './commands/queueEmail.command';
import { PasswordResetTemplateDto } from './dto/passwordResetTemplate.dto';
import { TrainerAccountApproveDto } from './dto/trainerAccountApprove.dto';
import { TrainerAccountRejectDto } from './dto/trainerAccountReject.dto';

@Injectable()
export class MailService {
    constructor(
        private readonly commandBus: CommandBus,
    ) { }

    async sendPasswordResetEmail(to: string, payload: Omit<PasswordResetTemplateDto, 'email'>) {
        return this.commandBus.execute(
            new QueueEmailCommand(
                to,
                'Password Reset',
                'password-reset.template.ejs',
                payload,
            )
        );
    }

    async sendTrainerAccountRejectEmail(to: string, payload: Omit<TrainerAccountRejectDto, 'email'>) {
        return this.commandBus.execute(
            new QueueEmailCommand(
                to,
                'Account Rejected',
                'trainerAccountReject.template.ejs',
                payload,
            )
        );
    }

    async sendTrainerAccountApproveEmail(to: string, payload: Omit<TrainerAccountApproveDto, 'email'>) {
        return this.commandBus.execute(
            new QueueEmailCommand(
                to,
                'Account Approved',
                'trainerAccountApprove.template.ejs',
                payload,
            )
        );
    }
}
