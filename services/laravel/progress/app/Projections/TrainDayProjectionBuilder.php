<?php

namespace App\Projections;

use App\Models\TrainDayProgress;
use App\Models\ExerciseProgress;
use App\Models\WorkoutLog;

class TrainDayProjectionBuilder
{
    /**
     * Build or rebuild a Train Day Progress snapshot
     *
     * @param int $userId
     * @param string $trainDayName
     * @return TrainDayProgress
     */
    public function rebuildTrainDay(int $userId, string $trainDayName): TrainDayProgress
    {

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
