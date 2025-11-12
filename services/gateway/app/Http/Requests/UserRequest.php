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
        $isCreate = $this->isMethod('post');

        return [
            'name' => [$isCreate ? 'required' : 'sometimes', 'string', 'max:255'],
            'email' => [
                $isCreate ? 'required' : 'sometimes',
                'email',
            ],
            'password' => [$isCreate ? 'required' : 'sometimes', 'string', 'min:8'],

            'gender' => ['nullable', Rule::in(['male', 'female'])],
            'birth_date' => [$isCreate ? 'required' : 'sometimes', 'date'],
            'height_cm' => [$isCreate ? 'required' : 'sometimes', 'numeric', 'between:50,300'],
            'weight_kg' => [$isCreate ? 'required' : 'sometimes', 'numeric', 'between:20,500'],
            'body_fat_percentage' => ['nullable', 'numeric', 'between:1,60'],
            'goal' => ['nullable', Rule::in(['lose_weight', 'maintain_weight', 'gain_muscle', 'body_recomp'])],
            'roles' => ['nullable', 'array'],
        ];
    }
}
