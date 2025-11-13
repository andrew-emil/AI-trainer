<?php

namespace App\Services;

use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\AuthorizationException;
use App\Models\User;

class AuthorizationService
{
    /**
     * Authorize a user for an ability
     *
     * @param User $user The current authenticated user
     * @param string $ability Ability to check (from Abilities constants)
     * @param mixed|null $model Optional model for policy-based authorization
     * @throws AuthorizationException
     */
    public function authorize(User $user, string $ability, $model = null): void
    {
        if (Gate::forUser($user)->denies($ability, $model)) {
            throw new AuthorizationException("User {$user->id} is not authorized for ability: {$ability}");
        }
    }

    /**
     * Check if user is allowed for ability
     */
    public function allows(User $user, string $ability, $model = null): bool
    {
        return Gate::forUser($user)->allows($ability, $model);
    }

    /**
     * Check if user is denied for ability
     */
    public function denies(User $user, string $ability, $model = null): bool
    {
        return Gate::forUser($user)->denies($ability, $model);
    }

    /**
     * Authorize based on role
     *
     * @param User $user
     * @param string|array $requiredRoles
     * @throws AuthorizationException
     */
    public function authorizeRole(User $user, string|array $requiredRoles): void
    {
        $roles = is_array($requiredRoles) ? $requiredRoles : [$requiredRoles];

        foreach ($roles as $role) {
            if (in_array($role, $user->roles ?? [])) {
                return;
            }
        }

        throw new AuthorizationException("User {$user->id} does not have required role(s): " . implode(',', $roles));
    }
}
