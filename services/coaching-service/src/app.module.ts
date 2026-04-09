import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ActivityLogModule } from './activity-log/activity-log.module';
import { BodyPartsModule } from './body-parts/body-parts.module';
import { BodyWeightLogsModule } from './body-weight-logs/body-weight-logs.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { ExercisesModule } from './exercises/exercises.module';
import { MusclesModule } from './muscles/muscles.module';
import { NutritionPlansModule } from './nutrition-plans/nutrition-plans.module';
import { NutritionModule } from './nutrition/nutrition.module';
import { RabbitMQClientModule } from './rabbitmq-client/rabbitmq-client.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TraineeEnrollmentsModule } from './trainee-enrollments/trainee-enrollments.module';
import { TrainerMetricsModule } from './trainer-metrics/trainer-metrics.module';
import { WorkoutLogsModule } from './workout-logs/workout-logs.module';
import { WorkoutPlansModule } from './workout-plans/workout-plans.module';

import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import rabbitConfig, { rabbitSchema } from './common/config/rabbit.config';
import { NutritionPlanAssignmentModule } from './nutrition-plan-assignment/nutrition-plan-assignment.module';
import { TrainerTraineesModule } from './trainer-trainees/trainer-trainees.module';
import { WorkoutAssignmentModule } from './workout-assignment/workout-assignment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object()
        .concat(rabbitSchema),
      load: [rabbitConfig],
    }),
    ActivityLogModule,
    BodyPartsModule,
    BodyWeightLogsModule,
    EquipmentsModule,
    ExercisesModule,
    MusclesModule,
    NutritionModule,
    NutritionPlansModule,
    WorkoutLogsModule,
    WorkoutPlansModule,
    PrismaModule,
    TrainerMetricsModule,
    RabbitMQClientModule,
    ReviewsModule,
    TraineeEnrollmentsModule,
    TrainerTraineesModule,
    WorkoutAssignmentModule,
    NutritionPlanAssignmentModule,
  ],
  providers: [
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
