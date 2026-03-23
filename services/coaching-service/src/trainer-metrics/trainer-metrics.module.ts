import { Module } from '@nestjs/common';
import { TrainerMetricsService } from './trainer-metrics.service';
import { TrainerMetricsController } from './trainer-metrics.controller';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';

@Module({
  controllers: [TrainerMetricsController],
  providers: [TrainerMetricsService],
  imports: [
    RabbitMQClientModule.register("rabbit.authQueue", AUTH_SERVICE)
  ],
  exports: [TrainerMetricsService]
})
export class TrainerMetricsModule {}
