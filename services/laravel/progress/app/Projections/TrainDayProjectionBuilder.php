<?php

namespace App\Projections;

use App\Models\TrainDayProgress;
use App\Models\ExerciseProgress;
use App\Models\WorkoutLog;

class TrainDayProjectionBuilder
{

    public function rebuildTrainDay(int $userId, int $workoutId)
    {

        $workout = WorkoutLog::where('user_id', $userId)
            ->where('workout_id', $workoutId)
            ->first();

        if (!$workout) {
            return null;
        }

        $trainDayName = $workout->workout_name;

        $trainDay = TrainDayProgress::firstOrCreate(
            [
                'user_id' => $userId,
                'train_day_name' => $trainDayName,
            ]
        );

        $exercises = $trainDay->exercises;


        $totalVolume = $exercises->sum('volume');
        $workout = WorkoutLog::where('user_id', $userId)
            ->where('workout_date', $trainDayName) // أو تاريخ اليوم إذا عندك
            ->first();

        $totalDuration = $workout?->duration_minutes ?? 0;

        // إنشاء أو تحديث TrainDayProgress
        $trainDay = TrainDayProgress::updateOrCreate(
            [
                'user_id' => $userId,
                'train_day_name' => $trainDayName,
            ],
            [
                'volume' => $totalVolume,
                'duration' => $totalDuration,
                // score ما يتحسبش هنا، الموديل مسؤول عنه
            ]
        );

        return $trainDay;
    }
}
