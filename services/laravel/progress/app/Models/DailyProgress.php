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
        'volume',
        'progress_overload',
        'score',
    ];


    protected $casts = [
        'progress_date' => 'date',
        'weight_kg' => 'float',
        'calories_burned' => 'float',
        'calories_consumed' => 'float',
        'volume' => 'float',
        'progress_overload' => 'array',
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
        // تهيئة المتغيرات
        $volumeScore = $this->volume ?? 0;
        $caloriesBurnedScore = $this->calories_burned ?? 0;
        $overloadData = $this->progress_overload ?? [];

        $progressWeight = $overloadData['weight_gain'] ?? 0;
        $progress1RM = $overloadData['one_rep_max_gain'] ?? 0;
        $progressVolume = $overloadData['volume_gain'] ?? 0;

        // 1. حساب الجزء الخاص بالجهد اليومي
        $dailyEffortScore = ($volumeScore * 0.01) + ($caloriesBurnedScore * 0.01);

        // 2. حساب الجزء الخاص بالتطور (Progressive Overload)
        $progressTotal = (
            ($progressWeight * 0.3) +
            ($progress1RM * 0.3) +
            ($progressVolume * 0.3)
        );

        // تطبيق وزن الـ Overload (الـ 0.1 في المعادلة المقترحة)
        $overloadBonus = 0.1 * $progressTotal;

        // 3. السكور الكلي
        $finalScore = $dailyEffortScore + $overloadBonus;

        // إضافة وزن إيجابي للسعرات المستهلكة (للتشجيع على الأكل الكافي للتعافي)
        // إذا كنت تستهدف البناء العضلي، قد ترغب في مكافأة الاستهلاك الكافي للبروتين.
        // $finalScore += ($this->calories_consumed ?? 0) * 0.005; // مثال: 500 سعرة إضافية = 2.5 نقطة بونص

        return round($finalScore, 2);
    }
}
