<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\StandingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::inertia('/', 'Home');

// Team route
Route::get('/team', [TeamController::class, 'show'])->name('team');

// Match route
Route::get('/match', [MatchController::class, 'show'])->name('match');

// Standing route
Route::get('/standing', [StandingController::class, 'show'])->name('standing');
