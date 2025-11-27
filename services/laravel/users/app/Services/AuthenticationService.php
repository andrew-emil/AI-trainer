<?php

namespace App\Services;

use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\AuthenticationException;
use PhpParser\Token;

class AuthenticationService
{
    public $blacklistService;

    public function __construct(TokenBlacklistService $blacklistService)
    {
        $this->blacklistService = $blacklistService;
    }

    public function authenticate(string $email, string $password): ?User
    {
        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return null;
        }

        return $user;
    }

    public function createToken(User $user, int $expiryHours = 2): string
    {
        $payload = [
            'sub'   => $user->id,
            'email' => $user->email,
            'roles' => $user->roles ?? [],
            'iat'   => time(),
            'exp'   => time() + ($expiryHours * 60 * 60),
        ];

        return JWT::encode($payload, env('JWT_SECRET'), env('JWT_ALGO', 'HS256'));
    }

    public function decodeToken(string $token): User
    {
        if ($this->blacklistService->isBlacklisted($token)) {
            throw new AuthenticationException('Token is blacklisted (logged out)');
        }

        try {
            $payload = JWT::decode($token, new Key(env('JWT_SECRET'), env('JWT_ALGO', 'HS256')));
        } catch (\Throwable $e) {
            throw new AuthenticationException('Invalid or expired token: ' . $e->getMessage());
        }

        $user = User::find($payload->sub ?? null);
        if (!$user) {
            throw new AuthenticationException('User not found for the provided token');
        }

        return $user;
    }

    public function refreshToken(string $oldToken, int $expiryHours = 2): ?string
    {
        try {
            if ($this->blacklistService->isBlacklisted($oldToken)) {
                return null;
            }
            $user = $this->decodeToken($oldToken);

            $exp = $this->getExpirationFromToken($oldToken);
            $this->blacklistService->blacklist($oldToken, $exp);

            return $this->createToken($user, $expiryHours);
        } catch (\Throwable $e) {
            // Safe: log error but do not crash consumer
            throw new AuthenticationException('Failed to refresh token: ' . $e->getMessage());
        }
    }


    public function getExpirationFromToken(string $token): int
    {
        try {
            $payload = JWT::decode($token, new Key(env('JWT_SECRET'), env('JWT_ALGO', 'HS256')));
            return $payload->exp ?? 0;
        } catch (\Throwable $e) {
            throw new AuthenticationException('Invalid or expired token: ' . $e->getMessage());
        }
    }

    public function getAuthorities(User $user): array
    {
        return $user->roles ?? [];
    }

    public function hasRole(User $user, string $role): bool
    {
        return in_array($role, $user->roles ?? []);
    }

    public function hasAnyRole(User $user, array $roles): bool
    {
        return !empty(array_intersect($roles, $user->roles ?? []));
    }
}
