import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import Joi from 'joi';
import { ActivityLogModule } from './activity-log/activity-log.module';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BodyPartModule } from './body-part/body-part.module';
import { BodyWeightLogsModule } from './body-weight-logs/body-weight-logs.module';
import { ChatModule } from './chat/chat.module';
import { RpcToHttpExceptionFilter } from './common/filters/rpc-to-http-exception.filter';
import jwtConfig, { jwtSchema } from './config/jwt.config';
import rabbitConfig, { rabbitSchema } from './config/rabbit.config';
import { EquipmentsModule } from './equipments/equipments.module';
import { MailsModule } from './mails/mails.module';
import { NotificationModule } from './notification/notification.module';
import { RabbitMQClientModule } from './rabbitmq-client/rabbitmq-client.module';
import { TraineeModule } from './trainee/trainee.module';
import { TrainerModule } from './trainer/trainer.module';
import { UserModule } from './user/user.module';
import { ExercisesModule } from './exercises/exercises.module';
import { MusclesModule } from './muscles/muscles.module';
import { NutritionModule } from './nutrition/nutrition.module';
import { NutritionPlanModule } from './nutrition-plan/nutrition-plan.module';
import { WorkoutLogsModule } from './workout-logs/workout-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object()
        .concat(rabbitSchema)
        .concat(jwtSchema),
      load: [rabbitConfig, jwtConfig],
    }),
    UserModule,
    TrainerModule,
    TraineeModule,
    AuthModule,
    RabbitMQClientModule,
    AdminModule,
    NotificationModule,
    MailsModule,
    ChatModule,
    ActivityLogModule,
    BodyPartModule,
    BodyWeightLogsModule,
    EquipmentsModule,
    ExercisesModule,
    MusclesModule,
    NutritionModule,
    NutritionPlanModule,
    WorkoutLogsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: RpcToHttpExceptionFilter },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    }
  ],
})
export class AppModule { }
