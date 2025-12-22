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
        Schema::create('daily_progress', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->date('progress_date');
            $table->float('weight_kg')->nullable();
            $table->float('calories_burned')->nullable();
            $table->float('calories_consumed')->nullable();
            $table->float('score')->nullable();
            //score can be calculated (volume * 0.01 + calories_burned * 0.01 + 0.1 * (progress_overload_weight * 0.3 + progress_overload_1rm * 0.3 + progress_overload_volume * 0.3)) for example
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_progress');
    }
};
