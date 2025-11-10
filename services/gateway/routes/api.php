<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\GeneralController;

// Route::any('{any}', [GeneralController::class, 'handle'])->where('any', '.*');

Route::get('/users/{id}', [GeneralController::class, 'getUser']);
