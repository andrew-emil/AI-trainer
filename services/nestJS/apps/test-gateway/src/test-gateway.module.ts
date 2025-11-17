import { Module } from '@nestjs/common';
import { ChatbotModule } from './chatbot/chatbot.module';
import { HistoryModule } from './history/history.module';
import { TestGatewayController } from './test-gateway.controller';

@Module({
  imports: [
    HistoryModule,
    ChatbotModule,
  ],
  controllers: [TestGatewayController],
  providers: [],
})
export class TestGatewayModule { }
