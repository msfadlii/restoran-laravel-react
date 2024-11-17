<?php

namespace App\Http\Controllers;
use App\Models\Menu;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Controller;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Order::with('user', 'orderItems.menu'); // Ambil relasi user dan item pesanan
    
        // Filter berdasarkan nama customer
        if (request('customer')) {
            $query->whereHas('user', function ($q) {
                $q->where('name', 'like', '%' . request('customer') . '%');
            });
        }
    
        // Filter berdasarkan status pesanan
        if (request('status')) {
            $query->where('status', request('status'));
        }
    
        // Filter berdasarkan rentang total harga
        if (request('min_total')) {
            $query->where('total_harga', '>=', request('min_total'));
        }
        if (request('max_total')) {
            $query->where('total_harga', '<=', request('max_total'));
        }
    
        // Ambil data pesanan dengan pagination
        $orders = $query->latest()->paginate(10);
    
        return inertia('Order/Index', [
            'orders' => Order::with('user')->paginate(10), // Kirim data paginated ke frontend
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $order = Order::with(['user', 'orderItems.menu'])->findOrFail($id);

        return Inertia::render('Order/Show', [
            'order' => $order
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
{
    $menus = Menu::all(); // Ambil semua menu
    return inertia('Order/Edit', [
        'order' => $order,
        'menus' => $menus, // Pastikan menus dikirim ke frontend
    ]);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        Log::info('Received data:', $request->all());

        // Validasi data
        $request->validate([
            'status' => 'required|string',
            'menu_items' => 'required|array',
            'total_price' => 'required|numeric',
        ]);
    
        // Cari order berdasarkan ID
        $order = Order::find($id);
    
        // Pastikan order ditemukan
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }
    
        // Hapus order items lama jika ada perubahan
        $order->orderItems()->delete();
    
        // Tambahkan menu items yang baru
        foreach ($request->menu_items as $item) {
            $order->orderItems()->create([
                'menu_id' => $item['menu_id'],
                'quantity' => $item['quantity'],
                'harga' => $item['price'],
            ]);
        }
        Log::info('Updating order:', [
            'order_id' => $order->id,
            'status' => $request->status,
            'total_harga' => $request->total_price,
        ]);
    
        // Perbarui status dan total price
        $order->status = $request->status;
        $order->total_harga = $request->total_price;
        $order->save();
    
        return response()->json(['success' => 'Order updated successfully!']);
    }
    
    
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return redirect()->route('order.index')->with('success', 'Order deleted successfully.');
    }
}
