import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from '../entity/conversation.entity';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
})
export class HistoryModule {}
