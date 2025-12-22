<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyProgress extends Model
{
    use HasFactory;


    protected $table = 'daily_progress';


    protected $fillable = [
        'user_id',
        'progress_date',
        'weight_kg',
        'calories_burned',
        'calories_consumed',
        'score',
    ];


    protected $casts = [
        'progress_date' => 'date',
        'weight_kg' => 'float',
        'calories_burned' => 'float',
        'calories_consumed' => 'float',
        'score' => 'float',
    ];


    protected static function booted()
    {
        static::saving(function ($model) {
            $model->score = $model->calculateScore();
        });
    }


    public function calculateScore(): float
    {
        $weightFactor = 0.2;
        $caloriesBurnedFactor = 0.5;
        $caloriesConsumedFactor = 0.3;

        $score = 0.0;

        if ($this->weight_kg !== null) {
            $score += $this->weight_kg * $weightFactor;
        }

        if ($this->calories_burned !== null) {
            $score += $this->calories_burned * $caloriesBurnedFactor;
        }

        if ($this->calories_consumed !== null) {
            $score += $this->calories_consumed * $caloriesConsumedFactor;
        }

        return $score;
    }
}
