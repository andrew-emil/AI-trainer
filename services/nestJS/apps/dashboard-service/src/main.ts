import { NestFactory } from '@nestjs/core';
import { DashboardServiceModule } from './dashboard-service.module';

async function bootstrap() {
  const app = await NestFactory.create(DashboardServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
