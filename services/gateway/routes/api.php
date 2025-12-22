<?php

use App\Http\Controllers\ProgressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;


Route::apiResource('users', UserController::class);

Route::post('/users/login', [UserController::class, 'login']);
Route::post('/users/register', [UserController::class, 'register']);
Route::post('/users/logout', [UserController::class, 'logout']);
Route::post('/users/refresh', [UserController::class, 'refreshToken']);
Route::post('/users/forgetPassword', [UserController::class, 'forgetPassword']);
Route::post('/users/resetPassword', [UserController::class, 'resetPassword']);


// Prefix all routes with 'progress' for clarity
Route::prefix('progress')->group(function () {

    // Get daily progress for a user (optional date)
    Route::get('/daily', [ProgressController::class, 'getDailyProgress']);

    // Get weekly progress (optional start date)
    Route::get('/weekly', [ProgressController::class, 'getWeeklyProgress']);

    // Get a specific exercise progress
    Route::get('/exercise', [ProgressController::class, 'getExerciseProgress']);

    // Get train day progress
    Route::get('/train-day', [ProgressController::class, 'getTrainDayProgress']);
});
