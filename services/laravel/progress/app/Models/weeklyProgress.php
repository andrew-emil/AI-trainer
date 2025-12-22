<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeeklyProgress extends Model
{
    use HasFactory;


    protected $table = 'weekly_progress';


    protected $fillable = [
        'user_id',
        'week_starting',
        'week_ending',
        'total_volume',
        'total_training_duration',
        'total_weight_progress',
        'total_calories_burned',
        'total_calories_consumed',
        'fat_loss_percentage',
        'muscle_gain_kg',
        'weight_kg_starting',
        'weight_kg_ending',
        'score',
    ];


    protected $casts = [
        'week_starting' => 'date',
        'week_ending' => 'date',
        'total_volume' => 'float',
        'total_training_duration' => 'float',
        'total_weight_progress' => 'float',
        'total_calories_burned' => 'float',
        'total_calories_consumed' => 'float',
        'fat_loss_percentage' => 'float',
        'muscle_gain_kg' => 'float',
        'weight_kg_starting' => 'float',
        'weight_kg_ending' => 'float',
        'score' => 'float',
    ];


    protected static function booted()
    {
        static::saving(function ($model) {

            $averageDailyScore = DailyProgress::where('user_id', $model->user_id)
                ->whereBetween('progress_date', [
                    $model->week_starting,
                    $model->week_ending
                ])
                ->avg('score') ?? 0;

            $model->score = $model->calculateWeeklyScore($averageDailyScore);
        });
    }





    public function calculateWeeklyScore(float $averageDailyScore = 0.0): float
    {
        $totalCaloriesBurned = $this->total_calories_burned ?? 0;
        $fatLossPercentage = $this->fat_loss_percentage ?? 0;
        $muscleGainKg = $this->muscle_gain_kg ?? 0;

        // 1. حساب نقاط الجهد الأسبوعي (السعرات الحرارية)
        $caloriesScore = $totalCaloriesBurned * 0.001;

        // 2. حساب نقاط التكوين البدني (الدهون والعضلات)
        // يتم ضرب نسبة فقدان الدهون (مثلاً 0.01 لـ 1%)
        $bodyCompositionScore = ($fatLossPercentage * 1) + ($muscleGainKg * 1);

        // 3. وزن متوسط السكور اليومي (وهو الأهم)
        $dailyScoreWeight = $averageDailyScore * 0.5;

        $finalScore = $caloriesScore + $bodyCompositionScore + $dailyScoreWeight;

        return $finalScore;
    }
}
