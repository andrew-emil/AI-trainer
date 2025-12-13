<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NutritionLog extends Model
{
    use HasFactory;


    protected $table = 'nutrition_logs';


    protected $fillable = [
        'user_id',
        'log_date',
        'calories_consumed',
        'protein_grams',
        'carbohydrates_grams',
        'fats_grams',
        'meals_description',
    ];


    protected $casts = [
        'log_date' => 'date',
        'calories_consumed' => 'float',
        'protein_grams' => 'float',
        'carbohydrates_grams' => 'float',
        'fats_grams' => 'float',
    ];
}
