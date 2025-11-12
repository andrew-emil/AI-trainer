<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Collection;

class UserService
{

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
    public function updateUser(int $id, array $data)
    {
        $validated = $this->validateData($data, false);
        $user = User::find($id);

        if (!$user) {
            return null;
        }

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
    public function deleteUser(int $id): bool
    {
        $user = User::find($id);

        if (!$user) {
            return false;
        }

        return $user->delete();
    }
}
