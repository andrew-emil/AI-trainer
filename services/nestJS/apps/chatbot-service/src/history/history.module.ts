import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from '../entity/conversation.entity';
import { RedisProvider } from '../providers/redis.provider';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService, RedisProvider],
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
})
export class HistoryModule {}
