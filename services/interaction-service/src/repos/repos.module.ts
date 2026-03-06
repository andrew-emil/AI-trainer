import { Module } from '@nestjs/common';
import { ConversationRepo } from './conversation.repo';
import { MessageRepo } from './message.repo';
import { NotificationRepo } from './notification.repo';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [
        ConversationRepo,
        MessageRepo,
        NotificationRepo,
    ],
    exports: [
        ConversationRepo,
        MessageRepo,
        NotificationRepo,
    ]
})
export class ReposModule { }
