import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PasswordResetTemplateDto } from './dto/passwordResetTemplate.dto';
import { TrainerAccountApproveDto } from './dto/trainerAccountApprove.dto';
import { TrainerAccountRejectDto } from './dto/trainerAccountReject.dto';
import { MailService } from './mail.service';
import { MailPattern } from 'src/common/patterns/mail.pattern';

@Controller()
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @EventPattern(MailPattern.RESET_PASSWORD)
    async handleResetPassword(@Payload() data: PasswordResetTemplateDto) {
        await this.mailService.sendPasswordResetEmail(data.email, data);
    }

    @EventPattern(MailPattern.TRAINER_ACCOUNT_REJECT)
    async handleTrainerAccountReject(@Payload() data: TrainerAccountRejectDto) {
        await this.mailService.sendTrainerAccountRejectEmail(data.email, data);
    }

    @EventPattern(MailPattern.TRAINER_ACCOUNT_APPROVE)
    async handleTrainerAccountApprove(@Payload() data: TrainerAccountApproveDto) {
        await this.mailService.sendTrainerAccountApproveEmail(data.email, data);
    }
}
