<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'token' => 'required|exists:users,invitation_token',
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::where('invitation_token', $request->token)
                   ->where('invitation_token_expires_at', '>', now())
                   ->firstOrFail();

        $user->update([
            'name' => $request->name,
            'password' => Hash::make($request->password),
            'invitation_token' => null,
            'invitation_accepted_at' => now(),
            'status' => 'active'
        ]);

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('auth_token')->plainTextToken
        ]);
    }
}
