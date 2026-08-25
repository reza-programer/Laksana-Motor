<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MotorController;
use App\Http\Controllers\Api\PromoController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\TestimonialController;
use Illuminate\Support\Facades\Route;

// Public Endpoints
Route::prefix('motors')->group(function () {
    Route::get('/', [MotorController::class, 'index']);
    Route::get('/featured', [MotorController::class, 'featured']);
    Route::get('/brands', [MotorController::class, 'brands']);
    Route::get('/{id}', [MotorController::class, 'show']);
});

Route::prefix('promos')->group(function () {
    Route::get('/', [PromoController::class, 'index']);
    Route::get('/active', [PromoController::class, 'active']);
    Route::get('/{id}', [PromoController::class, 'show']);
});

Route::prefix('testimonials')->group(function () {
    Route::get('/', [TestimonialController::class, 'index']);
    Route::get('/active', [TestimonialController::class, 'active']);
    Route::get('/{id}', [TestimonialController::class, 'show']);
});

Route::get('/settings', [SettingController::class, 'index']);
Route::post('/settings', [SettingController::class, 'update']);

// Auth Endpoints
Route::post('/auth/login', [AuthController::class, 'login']);

// Admin Management Endpoints
Route::post('/motors', [MotorController::class, 'store']);
Route::put('/motors/{id}', [MotorController::class, 'update']);
Route::delete('/motors/{id}', [MotorController::class, 'destroy']);

Route::post('/promos', [PromoController::class, 'store']);
Route::put('/promos/{id}', [PromoController::class, 'update']);
Route::delete('/promos/{id}', [PromoController::class, 'destroy']);

Route::post('/testimonials', [TestimonialController::class, 'store']);
Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);
