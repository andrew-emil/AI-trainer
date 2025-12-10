import { Module } from '@nestjs/common';
import { RedisModule } from './infrastructure/redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [],
})
export class AppModule {}
