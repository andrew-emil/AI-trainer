import { Module } from '@nestjs/common';
import { ChatbotModule } from 'src/chatbot/chatbot.module';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { RedisProvider } from 'src/providers/redis.provider';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService, RedisProvider],
  imports: [ChatbotModule],

})
export class HistoryModule { }
