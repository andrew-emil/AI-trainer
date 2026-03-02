import { Schema, model, Document, Types } from 'mongoose';
import { EmailStatus } from 'src/common/enums/emailStatus.enum';

export interface IEmailJob extends Document {
    _id: Types.ObjectId;
    to: string; // user email
    subject: string;
    bodyHtml?: string;
    bodyText?: string;
    template?: string;     // optional template name
    payload?: any;         // template variables
    status: EmailStatus;
    attempts: number;
    lastError?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export const EmailQueueSchema = new Schema<IEmailJob>({
    to: { type: String, required: true, index: true },
    subject: { type: String },
    bodyHtml: { type: String },
    bodyText: { type: String },
    template: { type: String },
    payload: { type: Schema.Types.Mixed },
    status: { type: String, enum: Object.values(EmailStatus), default: EmailStatus.PENDING, index: true },
    attempts: { type: Number, default: 0 },
    lastError: { type: String, default: null },
}, { timestamps: true });


EmailQueueSchema.index({ status: 1, createdAt: 1 });

export const EmailQueue = model<IEmailJob>('EmailQueue', EmailQueueSchema);