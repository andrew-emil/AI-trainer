<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BodyMeasurement extends Model
{
    use HasFactory;


    protected $table = 'body_measurements';


    protected $fillable = [
        'user_id',
        'measurement_date',
        'weight_kg',
        'body_fat_percentage',
        'muscle_mass_kg',
        'bmr',
    ];


    protected $casts = [
        'measurement_date' => 'date', // لتحويل التاريخ إلى كائن Carbon
        'weight_kg' => 'float',
        'body_fat_percentage' => 'float',
        'muscle_mass_kg' => 'float',
        'bmr' => 'float', // معدل الأيض الأساسي
    ];
}
