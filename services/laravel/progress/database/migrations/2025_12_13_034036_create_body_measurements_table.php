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
        Schema::create('body_measurements', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->date('measurement_date');
            $table->float('weight_kg')->nullable();
            $table->float('body_fat_percentage')->nullable();
            $table->float('muscle_mass_kg')->nullable();
            $table->float('bmr')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('body_measurements');
    }
};
