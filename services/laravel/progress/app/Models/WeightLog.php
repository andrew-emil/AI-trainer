<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WeightLog extends Model
{
    protected $fillable = [
        'user_id',
        'weight_kg',
        'logged_at',
    ];

    protected $casts = [
        'weight_kg' => 'float',
        'logged_at' => 'datetime',
    ];
}
