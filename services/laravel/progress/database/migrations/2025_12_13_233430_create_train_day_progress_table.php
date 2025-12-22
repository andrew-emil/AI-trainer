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
        Schema::create('train_day_progress', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('train_day_name');
            $table->float('duration');
            $table->float('volume');
            // volume is the summition of all volumes of exercises in that day
            $table->float('score')->nullable();
            //score = (duration * 0.1 + volume * 0.01)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('train_day_progress');
    }
};
