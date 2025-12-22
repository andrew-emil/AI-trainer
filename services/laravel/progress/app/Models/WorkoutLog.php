<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutLog extends Model
{
    use HasFactory;

    protected $table = 'workout_logs';


    protected $fillable = [
        'user_id',
        'workout_id',
        'workout_name',
        'exercises_performed',
        'calories_burned',
        'duration_minutes',
        'workout_date',
        'notes',
        'volume',
    ];


    protected $casts = [
        'workout_date' => 'date',
        'exercises_performed' => 'array',
        'calories_burned' => 'float',
        'duration_minutes' => 'float',
        'volume' => 'float',
    ];
}
