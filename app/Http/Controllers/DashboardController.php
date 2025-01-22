<?php
namespace App\Http\Controllers;

use App\Models\OrderItem;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        $transactions = Transaksi::selectRaw('MONTH(created_at) as month, SUM(amount) as total')
        ->groupBy('month')
        ->orderBy('month')
        ->get()
        ->map(function($transaction) {
            $monthNames = [
                1 => 'January', 2 => 'February', 3 => 'March', 4 => 'April', 5 => 'May', 6 => 'June',
                7 => 'July', 8 => 'August', 9 => 'September', 10 => 'October', 11 => 'November', 12 => 'December'
            ];
            $transaction->month = $monthNames[$transaction->month];
            return $transaction;
        });

    // Menu Paling Laris
    $popularMenus = OrderItem::selectRaw('menus.nama as name, SUM(order_items.quantity) as sold')
        ->join('menus', 'order_items.menu_id', '=', 'menus.id')
        ->groupBy('menus.nama')
        ->orderByDesc('sold')
        ->take(5)
        ->get()
        ->map(function($menu) {
            $menu->sold = (int) $menu->sold;
            return $menu;
        });

    // Add Debugging Here to See the Data
    // dd($transactions, $popularMenus);

    // Return data to Inertia
    return inertia('Dashboard', [
        'transactions' => $transactions,
        'popularMenus' => $popularMenus,
    ]);
    }

}
