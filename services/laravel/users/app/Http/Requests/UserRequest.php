<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // You can add your auth logic here if needed
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user')?->id; // For update requests

        return [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'password' => $this->isMethod('post')
                ? 'required|string|min:8'
                : 'sometimes|string|min:8',
            'gender' => ['nullable', Rule::in(['male', 'female'])],
            'birth_date' => $this->isMethod('post') ? 'required|date' : 'sometimes|date',
            'heigth_cm' => $this->isMethod('post') ? 'required|numeric' : 'sometimes|numeric',
            'weight_kg' => $this->isMethod('post') ? 'required|numeric' : 'sometimes|numeric',
            'body_fat_percentage' => 'nullable|numeric',
            'goal' => ['nullable', Rule::in(['lose_weight', 'maintain_weight', 'gain_muscle', 'body_recomp'])],
        ];
    }
}
