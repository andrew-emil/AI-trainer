<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('weekly_progress', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->date('week_starting');
            $table->date('week_ending');
            $table->float('total_volume')->nullable();
            $table->float('total_training_duration')->nullable();
            //total weight progress can be calculated by summing up the daily weight progress over the week
            $table->float('total_weight_progress')->nullable();
            $table->float('total_calories_burned')->nullable();
            $table->float('total_calories_consumed')->nullable();
            $table->float('fat_loss_percentage')->nullable();
            $table->float('muscle_gain_kg')->nullable();
            $table->float('weight_kg')->nullable();
            $table->float('score')->nullable();
            //score can be calculated based on weekly metrics like (total_calories_burned * 0.01  + fat_loss_percentage * 0.1 + muscle_gain_kg * 0.1 + average_daily_progress_score * 0.5) for example
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weekly_progress');
    }
};
