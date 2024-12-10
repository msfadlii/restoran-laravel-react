<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Menu;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Transaksi;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'username' => 'test',
        ]);

        User::factory(20)->create();

        Menu::factory(10)->create();

        Order::factory(5)->create()->each(function ($order) {
            $item = OrderItem::factory()->create(['order_id' => $order->id]);
            $order->update(['total_harga' => $item->quantity * $item->menu->harga]);
            
            Transaksi::factory()->create([
                'order_id' => $order->id,
                'amount' => $order->total_harga,
            ]);
        });
    }
}
