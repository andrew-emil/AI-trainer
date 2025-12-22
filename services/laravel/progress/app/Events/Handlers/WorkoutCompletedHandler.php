<?php

namespace App\Events\Handlers;

use App\Projections\DailyProjectionBuilder;
use App\Services\ProgressWriteService;

class WorkoutCompletedHandler
{
    public function handle(array $event)
    {
        $write = app(ProgressWriteService::class);
        $dailyBuilder = app(DailyProjectionBuilder::class);
        $weeklyBuilder = app(\App\Projections\WeeklyProjectionBuilder::class);
        $exerciseBuilder = app(\App\Projections\ExerciseProjectionBuilder::class);
        $trainDayBuilder = app(\App\Projections\TrainDayProjectionBuilder::class);

        $write->logWorkout($event['payload']);
        $dailyBuilder->rebuildDaily($event['payload']['user_id']);
        $weeklyBuilder->rebuildWeekly($event['payload']['user_id']);
        $exerciseBuilder->rebuildExercise($event['payload']['user_id']);
        $trainDayBuilder->rebuildTrainDay($event['payload']['user_id'], $event['payload']['workout_id']);
    }
}
