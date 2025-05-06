<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Mail\InvitationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class InviteController extends Controller
{
    public function sendInvitation(Request $request)
    {
        // Validation des champs
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'role' => 'required|string|in:admin,user', // ou autres rôles définis
        ]);

        $token = Str::random(60); // Générer un token unique pour l'invitation

        // Créer un enregistrement pour l'invitation dans la base de données
        // Ce modèle peut être amélioré si vous voulez garder une trace des invitations envoyées
        $user = User::create([
            'email' => $request->email,
            'role' => $request->role,
            'invitation_token' => $token,
            'status' => 'invited',
        ]);

        // Envoi de l'email avec le lien d'invitation
        Mail::to($request->email)->send(new InvitationMail($user, $token));

        return response()->json(['message' => 'Invitation envoyée !'], 200);
    }
}
