<?php

namespace Database\Factories;

use App\Models\Transaksi;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransaksiFactory extends Factory
{
    protected $model = Transaksi::class;

    public function definition(): array
    {
        $order = Order::factory()->create();
        $user = User::inRandomOrder()->first();
        $randomDate = $this->faker->dateTimeThisYear($max = 'now');
         // Generate a random date within the same year but with a different month
         $randomMonth = $this->faker->numberBetween(1, 12);  // Random month between 1 and 12
        //  $randomDay = $this->faker->numberBetween(1, 28);    // Random day (28 to avoid overflow in months with less than 31 days)
        //  $randomHour = $this->faker->numberBetween(0, 23);   // Random hour
        //  $randomMinute = $this->faker->numberBetween(0, 59); // Random minute
 
         // Create a random date with a random month, day, and time within the same year
         $randomDate = $this->faker->dateTimeInInterval("2025-01-01", "+{$randomMonth} month",);

        return [
            'order_id' => $order->id,
            'user_id' => $user->id,
            'amount' => $this->faker->numberBetween(150000, 300000), // Angka acak antara 1.500.000 hingga 3.000.000
            'payment_method_id' => PaymentMethod::query()->inRandomOrder()->value('id'),
            'created_at' => $randomDate,  // Random created_at
            'updated_at' => $randomDate,
        ];
    }
}
