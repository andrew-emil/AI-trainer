<?php

namespace App\Services;

use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\AuthenticationException;

class AuthenticationService
{
    /**
     * Authenticate a user by email and password.
     *
     * @param string $email
     * @param string $password
     * @return User|null
     */
    public function authenticate(string $email, string $password): ?User
    {
        $user = User::where('email', $email)->first();

        if (!$user) {
            return null;
        }

        if (!Hash::check($password, $user->password)) {
            return null;
        }

        return $user;
    }

    /**
     * Create a JWT for the authenticated user.
     *
     * @param User $user
     * @param int $expiryHours
     * @return string
     */
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

    /**
     * Decode a JWT and return the corresponding user.
     *
     * @param string $token
     * @return User
     * @throws AuthenticationException
     */
    public function decodeToken(string $token): User
    {
        try {
            $payload = JWT::decode($token, new Key(env('JWT_SECRET'), env('JWT_ALGO', 'HS256')));
        } catch (\Throwable $e) {
            throw new AuthenticationException('Invalid or expired token: ' . $e->getMessage());
        }

        // Fetch user from DB
        $user = User::find($payload->sub ?? null);
        if (!$user) {
            throw new AuthenticationException('User not found for the provided token');
        }

        return $user;
    }

    /**
     * Get the authorities/roles of a user.
     *
     * @param User $user
     * @return array
     */
    public function getAuthorities(User $user): array
    {
        return $user->roles ?? [];
    }

    /**
     * Check if a user has a specific role.
     *
     * @param User $user
     * @param string $role
     * @return bool
     */
    public function hasRole(User $user, string $role): bool
    {
        return in_array($role, $user->roles ?? []);
    }

    /**
     * Check if a user has any of the specified roles.
     *
     * @param User $user
     * @param array $roles
     * @return bool
     */
    public function hasAnyRole(User $user, array $roles): bool
    {
        return !empty(array_intersect($roles, $user->roles ?? []));
    }
}
