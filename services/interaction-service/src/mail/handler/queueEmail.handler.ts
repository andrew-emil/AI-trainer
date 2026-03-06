import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { QueueEmailCommand } from "../commands/queueEmail.command";
import { InjectModel } from "@nestjs/mongoose";
import { EmailQueue, IEmailJob } from "src/database/models/emailQueue.model";
import { Model } from "mongoose";

@CommandHandler(QueueEmailCommand)
export class QueueEmailHandler implements ICommandHandler<QueueEmailCommand> {
    constructor(
        @InjectModel(EmailQueue.name)
        private readonly emailQueueModel: Model<IEmailJob>,
    ) { }

    async execute(command: QueueEmailCommand): Promise<{ actionId: string; }> {
        const emailJob = await this.emailQueueModel.create({
            to: command.to,
            subject: command.subject,
            template: command.template,
            payload: command.payload,
        });
        return { actionId: emailJob._id.toString() };
    }

}