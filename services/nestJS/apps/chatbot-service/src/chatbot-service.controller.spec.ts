import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotServiceController } from './chatbot-service.controller';
import { ChatbotServiceService } from './chatbot-service.service';

describe('ChatbotServiceController', () => {
  let chatbotServiceController: ChatbotServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatbotServiceController],
      providers: [ChatbotServiceService],
    }).compile();

    chatbotServiceController = app.get<ChatbotServiceController>(ChatbotServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chatbotServiceController.getHello()).toBe('Hello World!');
    });
  });
});
