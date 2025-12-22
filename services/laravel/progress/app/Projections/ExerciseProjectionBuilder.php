<?php

namespace App\Projections;

use App\Models\ExerciseProgress;

class ExerciseProjectionBuilder
{
    public function rebuildExercise(array $data): ExerciseProgress
    {
        return ExerciseProgress::create(
            [
                'user_id'       => $data['user_id'],
                'train_day_id'  => $data['train_day_id'],
                'exersice_name' => $data['exercise_name'],
            ],
            [
                'volume'             => $data['volume'],
                'progress_overload'  => $data['progress_overload'],
            ]
        );
    }
}
