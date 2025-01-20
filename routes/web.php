<?php

use App\Http\Controllers\MejaController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservasiController;
use App\Http\Controllers\TransaksiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Rute admin
Route::prefix('admin')->middleware(['auth'])->group(function() {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
        ->name('admin.dashboard');

    Route::resource('menu', MenuController::class);
    Route::resource('order', OrderController::class);
    Route::resource('transaksi', TransaksiController::class);
    Route::resource('meja', MejaController::class);
    Route::resource('reservasi', ReservasiController::class);
    
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Rute Client
Route::middleware(['auth', 'verified'])->group(function () {
    
});

require __DIR__.'/auth.php';
