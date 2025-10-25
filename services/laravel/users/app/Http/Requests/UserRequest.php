<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user')?->id; // for update routes

        // Determine if this is a create or update request
        $isCreate = $this->isMethod('post');

        return [
            'name' => $isCreate ? 'required|string|max:255' : 'sometimes|string|max:255',
            'email' => [
                $isCreate ? 'required' : 'sometimes',
                'email',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'password' => $isCreate
                ? 'required|string|min:8'
                : 'sometimes|string|min:8',
            'gender' => ['nullable', Rule::in(['male', 'female'])],
            'birth_date' => $isCreate ? 'required|date' : 'sometimes|date',
            'heigth_cm' => $isCreate ? 'required|numeric' : 'sometimes|numeric',
            'weight_kg' => $isCreate ? 'required|numeric' : 'sometimes|numeric',
            'body_fat_percentage' => 'nullable|numeric',
            'goal' => ['nullable', Rule::in(['lose_weight', 'maintain_weight', 'gain_muscle', 'body_recomp'])],
        ];
    }
}
