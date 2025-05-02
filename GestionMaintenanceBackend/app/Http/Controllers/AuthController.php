<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class AuthController extends Controller
{
    
    //   Inscription d'un nouvel utilisateur
     
    public function register(Request $request)
    {
        // Validation des données
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'sometimes|in:user,admin',  // Optionnel (valeur par défaut: 'user')
            'status' => 'sometimes|in:Actif,Inactif', // Optionnel
        ]);

        // Création de l'utilisateur
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Cryptage du mot de passe
            'role' => $request->role ?? 'user',      // Valeur par défaut
            'status' => $request->status ?? 'Actif', // Valeur par défaut
        ]);

        // Génération du token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => "Inscription reussite",
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    
    //  Connexion de l'utilisateur
     
    public function login(Request $request)
    {
        // Validation
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Recherche de l'utilisateur
        $user = User::where('email', $request->email)->first();

        // Vérification du mot de passe
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants sont incorrects.'],
            ]);
        }
        // verification du status
        if ($user->status === 'inactive') {
            return response()->json(['message' => 'Compte désactivé'], 403);
        }

        // Suppression des anciens tokens (optionnel)
        $user->tokens()->delete();

        // Génération d'un nouveau token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => "Connection reussite",
            'user' => $user,
            'token' => $token,
        ]);
    }

 //   Déconnexion (révoque le token)
     
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie.',
        ]);
    }

    
    //  Récupère les données de l'utilisateur connecté
     
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}