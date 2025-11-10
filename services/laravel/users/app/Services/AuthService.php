<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\JWT;

class AuthService
{
    public function authenticate(string $email, string $password)
    {
        $user = User::where('email', $email)->first();
        if (!$user) return null;
        if (!Hash::check($password, $user->password)) return null;
        return $user;
    }

    public function createToken(User $user, $expiryHours = 2)
    {
        $payload = [
            'sub' => $user->id,
            'email' => $user->email,
            'roles' => $user->roles ?? [],
            'iat' => time(),
            'exp' => time() + (60 * 60 * $expiryHours)
        ];
        $jwt = JWT::encode($payload, env('JWT_SECRET'), env('JWT_ALGO', 'HS256'));
        return $jwt;
    }

    public function getAuthorities(User $user)
    {
        return $user->roles ?? [];
    }
}
