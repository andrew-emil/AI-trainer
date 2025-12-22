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
        'volume',
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

    public function getProgressOverloadAttribute($value)
    {
        return json_decode($value, true);
    }

    public function setProgressOverloadAttribute($value)
    {
        $this->attributes['progress_overload'] = json_encode($value);
    }

    public function calculate1RM()
    {
        if (isset($this->progress_overload['weight']) && isset($this->progress_overload['reps'])) {
            $weight = $this->progress_overload['weight'];
            $reps = $this->progress_overload['reps'];
            return $weight * (1 + $reps / 30);
        }
        return null;
    }

    public function calculateScore()
    {
        $weight = $this->progress_overload['weight'] ?? 0;
        $volume = $this->volume ?? 0;
        $oneRM = $this->calculate1RM() ?? 0;

        $this->score = (0.1 * $weight) + (0.001 * $volume) + (0.3 * $oneRM);
        return $this->score;
    }
}
