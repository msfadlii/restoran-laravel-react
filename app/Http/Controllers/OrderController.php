<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Meja;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use App\Models\Menu;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $query = Order::query();

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", 'desc');

        if (request("status")) {
            $query->where("status", request("status"));
        }

        $orders = $query->with('meja')->orderBy($sortField, $sortDirection)->paginate(10);

        $orderItems = OrderItem::with('menu')->get();

        return inertia("Order/Index", [
            "orders" => OrderResource::collection($orders),
            "queryParams" => request()->query() ?: null,
            "orderItems" => $orderItems,
        ]);
    }

    public function create()
    {
        $mejaList = Meja::all(); // Ambil daftar semua meja
        return Inertia::render('Order/Create', [
            'mejaList' => $mejaList,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'meja_id' => 'required|exists:mejas,id',
            'menu_items' => 'required|array',
            'menu_items.*.menu_id' => 'required|exists:menus,id',
            'menu_items.*.quantity' => 'required|integer|min:1',
        ]);

        $totalHarga = 0;

        foreach ($request->menu_items as $item) {
            $menuPrice = $item['price'] ?? 0;
            $totalHarga += $menuPrice * $item['quantity'];
        }

        $order = Order::create([
            'user_id' => $request->user_id,
            'meja_id' => $request->meja_id,
            'total_harga' => $totalHarga,
            'status' => 'pending',
        ]);

        foreach ($request->menu_items as $item) {
            $order->orderItems()->create([
                'menu_id' => $item['menu_id'],
                'quantity' => $item['quantity'],
                'harga' => $item['price'],
            ]);
        }

        return redirect()->route('order.index')->with('success', 'Order berhasil dibuat.');
    }

    public function show($id)
    {
        $order = Order::with(['user', 'orderItems.menu', 'meja'])->findOrFail($id);

        return Inertia::render('Order/Show', [
            'order' => $order,
        ]);
    }

    public function edit(string $id)
    {
        $order = Order::with(['orderItems', 'meja'])->findOrFail($id);
        $mejaList = Meja::all();
        $menu = Menu::all();

        return Inertia::render('Order/Edit', [
            'order' => $order,
            'mejaList' => $mejaList,
            'menus' => $menu
        ]);
    }

    public function update(Request $request, string $id)
    {
        Log::info('Received data:', $request->all());

        // Validasi data
        $request->validate([
            'status' => 'required|string',
            'meja_id' => 'required|exists:mejas,id',
            'menu_items' => 'required|array',
            'menu_items.*.menu_id' => 'required|exists:menus,id',
            'menu_items.*.quantity' => 'required|integer|min:1',
        ]);

        $order = Order::findOrFail($id);

        $newTotalPrice = 0;

        foreach ($request->menu_items as $item) {
            $existingItem = $order->orderItems()->where('menu_id', $item['menu_id'])->first();

            if ($existingItem) {
                $existingItem->quantity += $item['quantity'];
                $existingItem->harga = $item['price'];
                $existingItem->save();
            } else {
                $order->orderItems()->create([
                    'menu_id' => $item['menu_id'],
                    'quantity' => $item['quantity'],
                    'harga' => $item['price'],
                ]);
            }

            // Hitung harga total dari semua item
            $newTotalPrice += $item['price'] * $item['quantity'];
        }

        // Perbarui total harga, meja_id, dan status di order
        $order->update([
            'total_harga' => $newTotalPrice,
            'status' => $request->status,
            'meja_id' => $request->meja_id,
        ]);

        return redirect()->route('order.show', $order->id)->with('success', 'Order berhasil diperbarui.');
    }

    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return redirect()->route('order.index')->with('success', 'Order berhasil dihapus.');
    }
}
