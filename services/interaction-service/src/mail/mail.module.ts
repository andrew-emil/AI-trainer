import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [MailService],
  exports: [MailService],
  imports: [
    ConfigModule,
    CqrsModule.forRoot(),
    ScheduleModule.forRoot(),
    DatabaseModule
  ],
  controllers: [MailController]
})
export class MailModule { }
