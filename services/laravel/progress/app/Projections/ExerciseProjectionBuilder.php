<?php

namespace App\Projections;

use App\Models\ExerciseProgress;
use App\Models\TrainDayProgress;
use App\Models\WorkoutLog;

class ExerciseProjectionBuilder
{
    public function rebuildExercise(int $userId)
    {
        // جلب كل الـ workouts للـ user مرتبة حسب التاريخ
        $workouts = WorkoutLog::where('user_id', $userId)
            ->orderBy('workout_date')
            ->orderBy('workout_id')
            ->get();

        foreach ($workouts as $workout) {
            $exercisesPerformed = $workout->exercises_performed ?? [];

            foreach ($exercisesPerformed as $exerciseData) {
                $exerciseName = $exerciseData['name'];
                $weight = $exerciseData['weight'] ?? 0;
                $reps = $exerciseData['reps'] ?? 0;
                $sets = $exerciseData['sets'] ?? 0;

                $volume = $weight * $reps * $sets;
                $oneRM = $weight * (1 + $reps / 30);

                $snapshot = [
                    'workout_id' => $workout->workout_id,
                    'date' => $workout->workout_date->toDateString(),
                    'weight' => $weight,
                    'reps' => $reps,
                    'sets' => $sets,
                    'volume' => $volume,
                    '1RM' => $oneRM,
                    'delta_weight' => 0,
                    'delta_volume' => 0,
                    'delta_1RM' => 0,
                ];

                // جلب الـ ExerciseProgress الحالي أو إنشاؤه
                $exercise = ExerciseProgress::firstOrCreate(
                    [
                        'user_id' => $userId,
                        'exersice_name' => $exerciseName,
                    ]
                );

                $overload = $exercise->progress_overload ?? [];

                // احسب الفرق مقارنة بالـ snapshot السابق
                if (!empty($overload)) {
                    $last = end($overload);
                    $snapshot['delta_weight'] = $weight - ($last['weight'] ?? 0);
                    $snapshot['delta_volume'] = $volume - ($last['volume'] ?? 0);
                    $snapshot['delta_1RM'] = $oneRM - ($last['1RM'] ?? 0);
                }

                // أضف الـ snapshot الجديد
                $overload[] = $snapshot;
                $exercise->progress_overload = $overload;

                $trainDayId = TrainDayProgress::where('user_id', $userId)
                    ->where('train_day_name', $workout->workout_name)
                    ->value('id');

                $exercise->train_day_id = $trainDayId;

                // حفظ score تلقائي في الموديل
                $exercise->save();
            }
        }
    }
}
