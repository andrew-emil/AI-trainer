<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = fake()->randomElement(['male', 'female']);
        $birthDate = fake()->dateTimeBetween('-60 years', '-18 years')->format('Y-m-d');
        $heightCm = $gender === 'male' ? fake()->numberBetween(165, 200) : fake()->numberBetween(150, 180);
        $weightKg = $gender === 'male' ? fake()->numberBetween(60, 120) : fake()->numberBetween(45, 100);
        $bodyFatPercentage = $gender === 'male'
            ? fake()->randomFloat(2, 10, 25)
            : fake()->randomFloat(2, 15, 30);
        $goal = fake()->randomElement(['lose_weight', 'maintain_weight', 'gain_muscle', 'body_recomp']);

        return [
            'name' => fake()->name($gender),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('123'),
            'gender' => $gender,
            'birth_date' => $birthDate,
            'height_cm' => $heightCm,
            'weight_kg' => $weightKg,
            'body_fat_percentage' => $bodyFatPercentage,
            'goal' => $goal,
            'roles' => ['USER'],
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
