import { NestFactory } from '@nestjs/core';
import { ChatbotServiceModule } from './chatbot-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ChatbotServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
