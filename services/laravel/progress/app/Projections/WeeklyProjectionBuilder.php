<?php

namespace App\Projections;

use App\Models\BodyMeasurement;
use App\Models\WeeklyProgress;
use App\Models\DailyProgress;
use App\Models\WorkoutLog;
use App\Models\ExerciseProgress;
use Carbon\Carbon;

class WeeklyProjectionBuilder
{
    public function rebuildWeekly(int $userId, ?Carbon $weekStart = null, array $data): WeeklyProgress
    {
        // تحديد بداية ونهاية الأسبوع
        $weekStart = $weekStart ?? now()->startOfWeek();
        $weekEnd   = (clone $weekStart)->endOfWeek();

        // جمع سجلات التقدم اليومي للأسبوع
        $dailyProgress = DailyProgress::where('user_id', $userId)
            ->whereBetween('progress_date', [$weekStart, $weekEnd])
            ->orderBy('progress_date')
            ->get();

        // مجموع السعرات
        $totalCaloriesBurned = $dailyProgress->sum('calories_burned');
        $totalCaloriesConsumed = $dailyProgress->sum('calories_consumed');

        // الوزن في بداية ونهاية الأسبوع
        $weightStart = $dailyProgress->first()?->weight_kg;
        $weightEnd   = $dailyProgress->last()?->weight_kg;

        // حساب فقدان الدهون واكتساب العضلات
        $measurements = BodyMeasurement::where('user_id', $userId)
            ->whereBetween('measurement_date', [$weekStart, $weekEnd])
            ->orderBy('measurement_date')
            ->get();

        $startMeasurement = $measurements->first();
        $endMeasurement   = $measurements->last();

        $fatLossPercentage = $startMeasurement && $endMeasurement
            ? $startMeasurement->body_fat_percentage - $endMeasurement->body_fat_percentage
            : 0;

        $muscleGainKg = $startMeasurement && $endMeasurement
            ? $endMeasurement->muscle_mass_kg - $startMeasurement->muscle_mass_kg
            : 0;


        // حجم التدريب الكلي
        $totalVolume = ExerciseProgress::where('user_id', $userId)
            ->whereBetween('created_at', [$weekStart, $weekEnd])
            ->sum('volume');

        // مدة التدريب الكلية
        $totalDuration = WorkoutLog::where('user_id', $userId)
            ->whereBetween('workout_date', [$weekStart, $weekEnd])
            ->sum('duration_minutes');

        // إنشاء أو تحديث السجل الأسبوعي
        $weekly = WeeklyProgress::updateOrCreate(
            [
                'user_id' => $userId,
                'week_starting' => $weekStart->toDateString(),
            ],
            [
                'week_ending' => $weekEnd->toDateString(),
                'total_volume' => $totalVolume,
                'total_training_duration' => $totalDuration,
                'total_calories_burned' => $totalCaloriesBurned,
                'total_calories_consumed' => $totalCaloriesConsumed,
                'weight_kg_starting' => $weightStart,
                'weight_kg_ending' => $weightEnd,
                'fat_loss_percentage' => max($fatLossPercentage, 0),
                'muscle_gain_kg' => max($muscleGainKg, 0),
            ]
        );

        $weekly->save();

        return $weekly;
    }
}
