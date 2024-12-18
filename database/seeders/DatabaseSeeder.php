<?php

namespace Database\Seeders;

use App\Models\Kategori;
use App\Models\Meja;
use App\Models\User;
use App\Models\Menu;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\StatusMeja;
use App\Models\StatusOrder;
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
        User::factory()->create([
            'name' => 'Test User',
            'username' => 'test',
        ]);

        User::factory(20)->create();

        $kategori = ['Makanan', 'Minuman', 'Cemilan', 'Dessert'];

        foreach ($kategori as $kat) {
            Kategori::create(['nama' => $kat]);
        }

        $statusMeja = ['Tersedia', 'Dipesan'];

        foreach ($statusMeja as $status) {
            StatusMeja::create(['status' => $status]);
        }

        $statusTersedia = StatusMeja::where('status', 'Tersedia')->first();
        $statusDipesan = StatusMeja::where('status', 'Dipesan')->first();

        $mejas = [
            ['no_meja' => 1, 'status_meja_id' => $statusTersedia->id],
            ['no_meja' => 2, 'status_meja_id' => $statusTersedia->id],
            ['no_meja' => 3, 'status_meja_id' => $statusDipesan->id],
            ['no_meja' => 4, 'status_meja_id' => $statusTersedia->id],
            ['no_meja' => 5, 'status_meja_id' => $statusTersedia->id],
            ['no_meja' => 6, 'status_meja_id' => $statusDipesan->id],
            ['no_meja' => 7, 'status_meja_id' => $statusTersedia->id],
            ['no_meja' => 8, 'status_meja_id' => $statusTersedia->id],
        ];

        foreach ($mejas as $meja) {
            Meja::create($meja);
        }

        $statusOrder = ['Selesai', 'Cancel', 'Pending'];

        foreach ($statusOrder as $status) {
            StatusOrder::create(['status' => $status]);
        }

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
