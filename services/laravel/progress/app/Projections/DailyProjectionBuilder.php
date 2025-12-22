<?php

namespace App\Projections;

use App\Models\DailyProgress;
use App\Models\NutritionLog;
use App\Models\WeightLog;
use App\Models\WorkoutLog;

class DailyProjectionBuilder
{
    public function rebuildDaily(int $userId): void
    {
        $today = now()->toDateString();

        $burned = WorkoutLog::whereDate('workout_date', $today)
            ->where('user_id', $userId)
            ->sum('calories_burned');

        $consumed = NutritionLog::whereDate('logged_at', $today)
            ->where('user_id', $userId)
            ->sum('calories_in');

        $weight = WeightLog::where('user_id', $userId)
            ->whereDate('logged_at', $today)
            ->latest('logged_at')
            ->value('weight_kg'); // آخر وزن في اليوم

        DailyProgress::updateOrCreate(
            [
                'user_id'       => $userId,
                'progress_date' => $today,
            ],
            [
                'weight_kg'          => $weight,
                'calories_burned'    => $burned,
                'calories_consumed'  => $consumed,
            ]
        );
    }
}
