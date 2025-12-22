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
        Schema::create('exercise_progress', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('exersice_name');
            $table->float('volume')->nullable();
            //volume = weight * reps * sets
            $table->json('progress_overload')->nullable();
            //progress can be made of multiple factors(e.g., weight(if you left higher weight), 1rm(can be calculated by weight*(1+reps/30)), volume(if he makes more reps, or more weight, generaly volume is weight*reps))
            $table->float('score')->nullable();
            //score = (0.1 * new weight + 0.001 * volume + 0.3 * 1rm)
            $table->foreignId('train_day_id')->constrained('train_day', 'id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercise_progress');
    }
};
