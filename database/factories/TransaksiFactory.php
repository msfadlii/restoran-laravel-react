<?php

namespace Database\Factories;

use App\Models\Transaksi;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaksi>
 */
class TransaksiFactory extends Factory
{
    protected $model = Transaksi::class;

    public function definition(): array
    {
        $order = Order::factory()->create();
        $user = User::inRandomOrder()->first();

        return [
            'order_id' => $order->id,
            'user_id' => $user->id,
            'amount' => $this->faker->numberBetween(150000, 300000), // Angka acak antara 1.500.000 hingga 3.000.000
            'payment_method_id' => PaymentMethod::query()->inRandomOrder()->value('id'),
        ];
    }
}
