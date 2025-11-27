<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;


Route::apiResource('users', UserController::class);

Route::post('/users/login', [UserController::class, 'login']);
Route::post('/users/register', [UserController::class, 'register']);
Route::post('/users/logout', [UserController::class, 'logout']);
Route::post('/users/refresh', [UserController::class, 'refreshToken']);
