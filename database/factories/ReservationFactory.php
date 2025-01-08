<?php

namespace Database\Factories;

use App\Models\Meja;
use App\Models\Reservation;
use App\Models\StatusReservasi;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservationFactory extends Factory
{
    public function definition(): array
    {
        $meja = Meja::whereNotIn('id', Reservation::pluck('meja_id')->toArray())->inRandomOrder()->first();

        if (!$meja) {
            $meja = Meja::inRandomOrder()->first();
        }

        return [
            'user_id' => User::inRandomOrder()->first(), 
            'meja_id' => $meja->id, 
            'tanggal_reservasi' => $this->faker->dateTimeBetween('now', '+7 days'), 
            'jumlah_tamu' => $this->faker->numberBetween(1, 10), 
            'status_reservasi_id' => StatusReservasi::inRandomOrder()->value('id'), 
            'keterangan' => $this->faker->sentence(),
        ];
    }
}