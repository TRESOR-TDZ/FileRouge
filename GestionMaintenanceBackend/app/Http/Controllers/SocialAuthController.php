<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class SocialAuthController extends Controller
{
    // Redirection vers le provider (Google/Facebook)
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    // Callback après authentification
    public function callback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();
            
            // Trouve ou crée l'utilisateur
            $user = User::firstOrCreate(
                ['email' => $socialUser->getEmail()],
                [
                    'name' => $socialUser->getName(),
                    'password' => bcrypt(Str::random(16)), // Mot de passe aléatoire
                    'role' => 'user', // Par défaut
                    'status' => 'active', // Compte activé automatiquement
                    'provider' => $provider, // Stocke le provider (optionnel)
                    'provider_id' => $socialUser->getId(), // ID du provider
                ]
            );

            // Connexion de l'utilisateur
            Auth::login($user);
            $token = $user->createToken('auth_token')->plainTextToken;

            // Redirection vers le frontend avec le token
            return redirect()->away(env('FRONTEND_URL') . "/social-auth?token={$token}");

        } catch (\Exception $e) {
            return redirect()->away(env('FRONTEND_URL') . "/login?error=social_login_failed");
        }
    }
}
