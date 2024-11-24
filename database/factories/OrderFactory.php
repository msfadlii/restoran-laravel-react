<?php

namespace Database\Factories;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'user_id' => User::query()->inRandomOrder()->value('id') ?? 1, // Pilih user ID acak atau fallback ke 1 jika tidak ada user
            'total_harga' => $this->faker->randomFloat(2, 0, 1000),
            'status' => $this->faker->randomElement(['pending', 'completed', 'cancel']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
