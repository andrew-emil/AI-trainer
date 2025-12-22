<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExerciseProgress extends Model
{
    use HasFactory;

    protected $table = 'exercise_progress';

    protected $fillable = [
        'user_id',
        'exersice_name',
        'progress_overload',
        'score',
        'train_day_id',
    ];

    protected $casts = [
        'progress_overload' => 'array',
    ];

    protected static function booted()
    {
        static::saving(function ($model) {
            $model->calculateScore();
        });
    }

    /**
     * Exercise belongs to a train day
     */
    public function trainDay()
    {
        return $this->belongsTo(TrainDayProgress::class, 'train_day_id');
    }



    public function calculateScore()
    {
        $weight = $this->progress_overload['delta_weight'] ?? 0;
        $volume = $this->progress_overload['delta_volume'] ?? 0;
        $oneRM = $this->progress_overload['delta_1RM'] ?? 0;
        $this->score = (0.1 * $weight) + (0.001 * $volume) + (0.3 * $oneRM);
        return $this->score;
    }
}
