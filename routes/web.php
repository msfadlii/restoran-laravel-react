<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingPageController;
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
    Route::get('/dashboard', [DashboardController::class, 'index'])
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
Route::middleware(['auth'])->group(function () {
    Route::get('/beranda', [LandingPageController::class, 'beranda'])->name('beranda');
    Route::get('/book-meja', [LandingPageController::class, 'book_meja'])->name('bookmeja');
    Route::post('/reservasi-meja', [LandingPageController::class, 'store'])->name('reservasi-meja');
    Route::get('/reservasi-meja/show', [LandingPageController::class, 'show'])->name('showreservasi.show');
});

require __DIR__.'/auth.php';
