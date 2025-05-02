<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Models\User;
use App\Mail\UserInvitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    // liste des utilisateurs
    public function index()
    {
        $user = auth()->user();

        if ($user->isSuperAdmin()) {
            return User::all();
        }

        if ($user->isAdmin()) {
            return User::where('role', '!=', 'super_admin')->get();
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Store a newly created resource in storage.
     */

    //  inviter un nouvel utilisateur
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users',
            'role' => 'required|in:admin,user'
        ]);

        $currentUser = auth()->user();

        // Vérification des permissions
        if ($currentUser->isAdmin() && $request->role === 'admin') {
            return response()->json(['message' => 'Vous ne pouvez pas créer un admin'], 403);
        }

        $token = Str::random(32);
        $invitationLink = url("/register?token=$token");

        // Création de l'utilisateur invité
        $user = User::create([
            'email' => $request->email,
            'role' => $request->role,
            'status' => 'active',
            'invitation_token' => $token,
            'invitation_sent_at' => now()
        ]);

        // Envoi de l'email
        Mail::to($request->email)->send(new UserInvitation($invitationLink, $request->role));

        // Notification aux admins (à implémenter)
        // Notification::send(...)

        return response()->json(['message' => 'Invitation envoyée'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    //  mise a jour user 
    public function update(Request $request, User $user)
    {
        $currentUser = auth()->user();

        // Super Admin peut tout modifier
        if ($currentUser->isSuperAdmin()) {
            $user->update($request->only(['name', 'email', 'role']));
            return $user;
        }

        // Admin peut modifier seulement les users normaux
        if ($currentUser->isAdmin() && $user->role === 'user') {
            $user->update($request->only(['name', 'email']));
            return $user;
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        {
            $currentUser = auth()->user();
    
            if ($currentUser->isSuperAdmin() || 
               ($currentUser->isAdmin() && $user->role === 'user')) {
                $user->delete();
                return response()->noContent();
            }
    
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }
}
