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
        Schema::create('nutrition_logs', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->date('log_date');
            $table->float('calories_consumed');
            $table->float('protein_grams')->nullable();
            $table->float('carbohydrates_grams')->nullable();
            $table->float('fats_grams')->nullable();
            $table->text('meals_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nutrition_logs');
    }
};
