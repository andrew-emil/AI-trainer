<?php

namespace App\Services;

use App\Models\NutritionLog;
use App\Models\WorkoutLog;

class ProgressWriteService
{
    public function logWorkout($data)
    {
        return WorkoutLog::create([
            'user_id' => $data['user_id'],
            'duration_min' => $data['duration'],
            'calories' => $data['calories'],
            'type' => $data['type'],
            'performed_at' => now(),
        ]);
    }

    public function logNutrition($data)
    {
        return NutritionLog::create([
            'user_id' => $data['user_id'],
            'calories_in' => $data['calories_in'],
            'protein' => $data['protein'],
            'carbs' => $data['carbs'],
            'fat' => $data['fat'],
            'logged_at' => now(),
        ]);
    }
}
