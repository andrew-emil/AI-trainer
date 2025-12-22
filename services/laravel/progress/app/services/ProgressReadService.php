<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\ExerciseProgress;
use App\Models\TrainDayProgress;
use App\Models\WeeklyProgress;
use Carbon\Carbon;

class ProgressReadService
{
    /**
     * Get daily progress for a user
     */
    public function getDailyProgress(int $userId, ?string $date = null): array
    {
        $date = $date ?? now()->toDateString();

        $row = DB::table('daily_progress')
            ->where('user_id', $userId)
            ->where('progress_date', $date)
            ->first();

        return [
            'status' => 'ok',
            'data' => $row ? (array) $row : [
                'user_id'   => $userId,
                'progress_date' => $date,
                'calories_burned'  => 0,
                'calories_consumed' => 0,
                'weight_kg' => 0,
                'score'     => 0,
            ]
        ];
    }

    /**
     * Get weekly progress using WeeklyProgress model
     */
    public function getWeeklyProgress(int $userId, ?string $weekStart = null): array
    {
        $weekStart = $weekStart
            ? Carbon::parse($weekStart)->startOfWeek(Carbon::FRIDAY)
            : Carbon::now()->startOfWeek(Carbon::FRIDAY);

        $weekly = WeeklyProgress::where('user_id', $userId)
            ->where('week_starting', $weekStart->toDateString())
            ->first();

        return [
            'status' => 'ok',
            'range'  => [$weekStart->toDateString(), $weekly?->week_ending],
            'data'   => $weekly ? $weekly->toArray() : [
                'user_id' => $userId,
                'week_starting' => $weekStart->toDateString(),
                'week_ending' => $weekStart->copy()->endOfWeek(Carbon::THURSDAY)->toDateString(),
                'total_volume' => 0,
                'total_training_duration' => 0,
                'total_calories_burned' => 0,
                'total_calories_consumed' => 0,
                'weight_kg_starting' => null,
                'weight_kg_ending' => null,
                'fat_loss_percentage' => 0,
                'muscle_gain_kg' => 0,
                'score' => 0,
            ]
        ];
    }

    /**
     * Get exercise progress for a user
     */
    public function getExercise(int $userId, ?string $exerciseName = null): array
    {
        $query = ExerciseProgress::where('user_id', $userId);

        if ($exerciseName) {
            $query->where('exersice_name', $exerciseName);
        }

        $exercises = $query->get();

        return [
            'status' => 'ok',
            'data' => $exercises
        ];
    }

    /**
     * Get train day progress for a user
     */
    public function getTrainDayProgress(int $userId, ?string $trainDayName = null): array
    {
        $query = TrainDayProgress::where('user_id', $userId);

        if ($trainDayName) {
            $query->where('train_day_name', $trainDayName);
        }

        $trainDays = $query->get();

        return [
            'status' => 'ok',
            'data' => $trainDays
        ];
    }
}
