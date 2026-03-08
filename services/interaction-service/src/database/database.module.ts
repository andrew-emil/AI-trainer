import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Conversation, ConversationSchema } from './models/conversation.model';
import { Message, MessageSchema } from './models/message.model';
import { Notification, NotificationSchema } from './models/notification.model';
import { EmailQueue, EmailQueueSchema } from './models/emailQueue.model';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const uri = config.getOrThrow<string>('MONGO_URI')
                return { uri }
            },
        }),
        MongooseModule.forFeature([
            { name: Conversation.name, schema: ConversationSchema },
            { name: Message.name, schema: MessageSchema },
            { name: Notification.name, schema: NotificationSchema },
            { name: EmailQueue.name, schema: EmailQueueSchema },
        ]),
    ],
    exports: [
        MongooseModule
    ]
})
export class DatabaseModule { }