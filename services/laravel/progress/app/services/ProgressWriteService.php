<?php

namespace App\Services;

use App\Models\BodyMeasurement;
use App\Models\NutritionLog;
use App\Models\WorkoutLog;

class ProgressWriteService
{
    public function logWorkout($data)
    {
        return WorkoutLog::create([
            'user_id' => $data['user_id'],
            'workout_id' => $data['workout_id'],
            'workout_name' => $data['workout_name'],
            'exercises_performed' => json_encode($data['exercises']),
            'calories_burned' => $data['calories_burned'],
            'duration_minutes' => $data['duration_minutes'],
            'workout_date' => $data['workout_date'],
            'notes' => $data['notes'] ?? null,
            'volume' => $data['volume'] ?? null,
            'created_at' => now(),
        ]);
    }

    public function logNutrition($data)
    {
        return NutritionLog::create([
            'user_id' => $data['user_id'],
            'log_date' => $data['log_date'],
            'calories_consumed' => $data['calories_consumed'],
            'protein_grams' => $data['protein_grams'] ?? null,
            'carbohydrates_grams' => $data['carbohydrates_grams'] ?? null,
            'fats_grams' => $data['fats_grams'] ?? null,
            'meals_description' => $data['meals_description'] ?? null,
            'created_at' => now(),
        ]);
    }

    public function logBodyMeasurement($data)
    {
        return BodyMeasurement::created([
            'user_id' => $data['user_id'],
            'measurement_date' => $data['measurement_date'],
            'weight_kg' => $data['weight_kg'] ?? null,
            'body_fat_percentage' => $data['body_fat_percentage'] ?? null,
            'muscle_mass_kg' => $data['muscle_mass_kg'] ?? null,
            'bmr' => $data['bmr'] ?? null,
            'created_at' => now(),
        ]);
    }
}
