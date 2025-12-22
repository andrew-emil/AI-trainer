<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainDayProgress extends Model
{

    protected $table = 'train_day_progress';

    protected $fillable = [
        'user_id',
        'train_day_name',
        'duration',
        'volume',
        'score',
    ];

    /**
     * A train day has many exercise progresses
     */
    public function exercises()
    {
        return $this->hasMany(ExerciseProgress::class, 'train_day_id');
    }

    public static function booted()
    {
        static::saving(function ($model) {
            $model->calculateScore();
        });
    }

    public function calculateScore()
    {
        $duration = $this->duration ?? 0;
        $volume = $this->volume ?? 0;
        $this->score = ($duration * 0.1 + $volume * 0.01);
        return $this->score;
    }
}
