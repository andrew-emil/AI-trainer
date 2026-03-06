import { Injectable, Logger } from "@nestjs/common";
import { renderFile } from "ejs";
import { join } from "path";
import { MailtrapClient } from "mailtrap";
import { EmailQueue, IEmailJob } from "src/database/models/emailQueue.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { EmailStatus } from "src/common/enums/emailStatus.enum";

@Injectable()
export class EmailWorker {
    private readonly logger = new Logger(EmailWorker.name);
    private readonly client: MailtrapClient;

    constructor(
        @InjectModel(EmailQueue.name)
        private readonly emailQueueModel: Model<IEmailJob>,
        private readonly configService: ConfigService,
    ) {
        this.client = new MailtrapClient({
            token: configService.get<string>('MAILTRAP_TOKEN')!,
        });
    }

    private renderTemplate(template: string, context: any): Promise<string> {
        const filePath = join(__dirname, "..", 'templates', template);
        return renderFile(filePath, context);
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async processQueue() {
        const jobs = await
            this.emailQueueModel
                .find({ status: EmailStatus.PENDING })
                .sort({ createdAt: 1 })
                .limit(10);
        if (!jobs || jobs.length === 0) {
            return;
        }
        for (const job of jobs) {
            await this.processJob(job);
        }
    }

    async processJob(job: IEmailJob) {
        job.status = EmailStatus.SENDING;
        await job.save();
        try {
            const html = await this.renderTemplate(job.template, job.payload);
            await this.client.send({
                from: {
                    email: this.configService.getOrThrow<string>('MAILTRAP_FROM_EMAIL'),
                    name: this.configService.getOrThrow<string>('MAILTRAP_FROM_NAME'),
                },
                to: [{ email: job.to }],
                subject: job.subject,
                html,
            });
            await job.updateOne({ status: EmailStatus.SENT });
        } catch (error) {
            job.attempts += 1;
            job.lastError = error?.message ?? "Unknown error";

            if (job.attempts >= 5) {
                job.status = EmailStatus.FAILED;
            }

            await job.save();

            this.logger.error(`Email job failed: ${job._id}`);
        }
    }
}