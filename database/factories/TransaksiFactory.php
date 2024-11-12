<?php

namespace Database\Factories;

use App\Models\Transaksi;
use App\Models\Order;
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

        return [
            'order_id' => $order->id,
            'amount' => $order->total_harga,
            'payment_method' => $this->faker->randomElement(['cash', 'credit_card', 'bank_transfer']),
            'tgl_transaksi' => $this->faker->dateTimeThisMonth,
        ];
    }
}
