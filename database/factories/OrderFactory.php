<?php

namespace Database\Factories;

use App\Models\Meja;
use App\Models\StatusOrder;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::query()->inRandomOrder()->value('id') ?? 1, // Pilih user ID acak atau fallback ke 1 jika tidak ada user
            'meja_id' => Meja::query()->inRandomOrder()->value('id'),
            'total_harga' => $this->faker->randomFloat(2, 0, 1000),
            'status_order_id' => StatusOrder::query()->inRandomOrder()->value('id'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
