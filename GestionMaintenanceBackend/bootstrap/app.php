<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
    //     return [
    //         //  Middleware essentiel pour Sanctum (gère les requêtes frontend avec cookies)
    //         \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    
    //         //  Middleware pour la limitation de requêtes (throttling API)
    //         \Illuminate\Routing\Middleware\ThrottleRequests::class,
    
    //   ,      // Laisse Laravel résoudre les liaisons automatiques de routes (Route Model Binding)
    //         \Illuminate\Routing\Middleware\SubstituteBindings::class,
    //         \Illuminate\Http\Middleware\HandleCors::class

            
    //     ];
        // middleware globaux pour les api 
        $middleware->api([
            \Illuminate\Http\Middleware\HandleCors::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            \Illuminate\Routing\Middleware\ThrottleRequests::class.':api',
            
        ]);
        
        // middleware de groupe
        $middleware->alias([
            'role' => \App\Http\Middleware\CheckRole::class,
            'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
            'auth:sanctum' => \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        // MIDDLEWARE de priorite 
        $middleware->priority([
            \Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests::class,
            \Illuminate\Cookie\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            \Illuminate\Auth\Middleware\Authorize::class,
        ]);
        
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
