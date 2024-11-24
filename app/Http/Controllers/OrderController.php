<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Controller;
use Inertia\Inertia;

class OrderController extends Controller
{
    
    public function index()
    {
        $query = Order::query();

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", 'desc');

        $orders = $query->orderBy($sortField, $sortDirection)->paginate(10);

        return inertia("Order/Index", [
            "orders" => OrderResource::collection($orders),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    public function create()
    {
        //
    }

   
    public function store(Request $request)
    {
        //
    }

   
    public function show(string $id)
    {
        $order = Order::with(['user', 'orderItems.menu'])->findOrFail($id);

    }
    
    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        Log::info('Received data:', $request->all());
    
        // Validasi data
        $request->validate([
            'status' => 'required|string',
            'menu_items' => 'required|array',
        ]);
    
        // Cari order berdasarkan ID
        $order = Order::find($id);
    
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }
    
        // Total harga baru
        $newTotalPrice = 0;
    
        // Tambahkan atau perbarui menu items
        foreach ($request->menu_items as $item) {
            $existingItem = $order->orderItems()->where('menu_id', $item['menu_id'])->first();
    
            if ($existingItem) {
                // Jika item sudah ada, perbarui quantity dan harga total
                $existingItem->quantity += $item['quantity'];
                $existingItem->harga = $item['price'];
                $existingItem->save();
            } else {
                // Jika item baru, tambahkan ke order
                $order->orderItems()->create([
                    'menu_id' => $item['menu_id'],
                    'quantity' => $item['quantity'],
                    'harga' => $item['price'],
                ]);
            }
    
            // Hitung harga total dari semua item
            $newTotalPrice += $item['price'] * $item['quantity'];
        }
    
        // Perbarui total harga dan status di order
        $order->total_harga = $newTotalPrice;
        $order->status = $request->status;
        $order->save();
    
    
        return redirect()->route('order.show', $order->id);
                            
        
    }
    

    
    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return redirect()->route('order.index')->with('success', 'Order deleted successfully.');
    }
}
