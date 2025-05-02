<?php

use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SocialAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController; 
use App\Http\Controllers\UserController; 



//  API Routes

// route authentification de base 
// Routes Publiques (sans authentification)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register/with-token', [UserController::class, 'store']);

// Routes Protégées (avec middleware Sanctum)
Route::middleware('auth:sanctum')->group(function () {

    // Retourne l'utilisateur connectee de l'utilisateur
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/user/insert', [AuthController::class, 'index']);
    
    // Route::get('/userProfil', [AuthController::class, 'userProfil']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware(['role:super admin, admin, utilisateur'])->group(function () {
        Route::get('/admin/dashboard', [AuthController::class, 'logout']); // ici on inserreara les function des taches qui seeront execute uniquement par les admin ou et super admin par exemples par exple des gestion utilisatteurs.
        Route::apiResource('users', UserController::class)->except(['create', 'edit']);
    });

});

// routes/api.php pour authentification socialmedia
Route::prefix('auth')->group(function () {
    // ... (routes existantes)
    Route::get('/{provider}/redirect', [SocialAuthController::class, 'redirect']);
    Route::get('/{provider}/callback', [SocialAuthController::class, 'callback']);
});