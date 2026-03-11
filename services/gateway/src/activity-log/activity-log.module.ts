import { Module } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ActivityLogController } from './activity-log.controller';
import { RabbitMQClientModule } from 'src/rabbitmq-client/rabbitmq-client.module';
import { COACH_DOMAIN_SERVICE } from 'src/common/constants/clientModuleNames';

@Module({
  controllers: [ActivityLogController],
  providers: [ActivityLogService],
  imports: [
    RabbitMQClientModule.register('rabbit.coachDomainQueue', COACH_DOMAIN_SERVICE)
  ]
})
export class ActivityLogModule {}
