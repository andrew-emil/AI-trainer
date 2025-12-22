<?php

namespace App\Events\Handlers;

use App\Projections\DailyProjectionBuilder;
use App\Projections\WeeklyProjectionBuilder;
use App\Services\ProgressWriteService;

class NutritionCompletedHandler
{
    public function handle(array $event)
    {
        $write = app(ProgressWriteService::class);
        $dailyBuilder = app(DailyProjectionBuilder::class);
        $weeklyBuilder = app(WeeklyProjectionBuilder::class);

        // تسجيل Nutrition
        $write->logNutrition($event['payload']);

        // تحديث الـ DailyProgress
        $dailyBuilder->rebuildDaily($event['payload']['user_id']);

        // تحديث WeeklyProgress لو حابب
        $weeklyBuilder->rebuildWeekly($event['payload']['user_id']);
    }
}
