<?php

namespace App\Services;

use App\Constants\Abilities;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Collection;

class UserService
{

    protected AuthorizationService $authorizationService;
    protected AuthenticationService $authenticationService;


    public function __construct(AuthorizationService $authorizationService, AuthenticationService $authenticationService)
    {
        $this->authorizationService = $authorizationService;
        $this->authenticationService = $authenticationService;
    }

    protected function validateData(array $data, bool $isCreate = true): array
    {
        $rules = [
            'name' => [$isCreate ? 'required' : 'sometimes', 'string', 'max:255'],
            'email' => [$isCreate ? 'required' : 'sometimes', 'email', 'unique:users,email'],
            'password' => [$isCreate ? 'required' : 'sometimes', 'string', 'min:8'],
            'gender' => ['nullable', 'in:male,female'],
            'birth_date' => [$isCreate ? 'required' : 'sometimes', 'date'],
            'height_cm' => [$isCreate ? 'required' : 'sometimes', 'numeric'],
            'weight_kg' => [$isCreate ? 'required' : 'sometimes', 'numeric'],
            'body_fat_percentage' => ['nullable', 'numeric'],
            'goal' => ['nullable', 'in:lose_weight,maintain_weight,gain_muscle,body_recomp'],
            'roles' => ['nullable', 'array'],
        ];

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }


    /**
     * Get all users.
     *
     * @return Collection
     */
    public function getAllUsers(): Collection
    {
        return User::all();
    }

    /**
     * Get a user by ID.
     *
     * @param  int  $id
     * @return User|null
     */
    public function getUserById(int $id): ?User
    {
        return User::find($id);
    }

    /**
     * Create a new user.
     *
     * @param  array  $data
     * @return User
     */
    public function createUser(array $data)
    {
        $validated = $this->validateData($data, true);
        $validated['password'] = Hash::make($validated['password']);
        $validated['roles'] = $validated['roles'] ?? ['USER'];

        return User::create($validated);
    }


    /**
     * Update an existing user.
     *
     * @param  int    $id
     * @param  array  $data
     * @return User|null
     */
    public function updateUser(string $jwt, int $id, array $data)
    {
        $currentUser = $this->authenticationService->decodeToken($jwt);
        $user = User::find($id);
        $validated = $this->validateData($data, false);

        if (!$user) {
            return null;
        }

        $this->authorizationService->authorize($currentUser, Abilities::USER_UPDATE, $user);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);
        return $user;
    }

    /**
     * Delete a user by ID.
     *
     * @param  int  $id
     * @return bool
     */
    public function deleteUser(string $jwt, int $id): bool
    {
        $currentUser = $this->authenticationService->decodeToken($jwt);
        $user = User::find($id);
        if (!$user) {
            return false;
        }
        if (! $currentUser) {
            return false;
        }
        $this->authorizationService->authorize($currentUser, Abilities::USER_DELETE, $user);

        return $user->delete();
    }

    public function login(string $email, string $password)
    {
        $user = $this->authenticationService->authenticate($email, $password);
        if (!$user) {
            return null;
        }
        $token = $this->authenticationService->createToken($user);
        return ['user' => $user, 'token' => $token];
    }
}
