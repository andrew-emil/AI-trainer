import { Module } from '@nestjs/common';
import { AUTH_SERVICE } from 'src/common/constants/clientModuleNames';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { TrainerMetricsModule } from 'src/trainer-metrics/trainer-metrics.module';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [
    TrainerMetricsModule,
    RabbitMQClientModule.register("rabbit.authQueue", AUTH_SERVICE)
  ]
})
export class ReviewsModule { }
