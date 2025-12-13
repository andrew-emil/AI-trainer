<?php

namespace App\Projections;

use App\Models\DailyProgress;
use App\Models\NutritionLog;
use App\Models\WorkoutLog;

class DailyProjectionBuilder
{
    public function rebuildDaily($userId)
    {
        $today = now()->toDateString();

        $burned = WorkoutLog::whereDate('performed_at', $today)
            ->where('user_id', $userId)
            ->sum('calories');

        $consumed = NutritionLog::whereDate('logged_at', $today)
            ->where('user_id', $userId)
            ->sum('calories_in');



        DailyProgress::updateOrCreate(
            ['user_id' => $userId, 'date' => $today],
            [
                'calories_burned' => $burned,
                'calories_consumed' => $consumed,

            ]
        );
    }

    private function calculateScore($burned, $consumed, $steps)
    {
        return ($burned / 10) + ($steps / 500);
    }
}
