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
import { WorkoutLogsModule } from './workout-logs/workout-logs.module';
import { WorkoutPlansModule } from './workout-plans/workout-plans.module';

@Module({
  imports: [
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
    PrismaModule
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
