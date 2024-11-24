<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

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
        //
    }

   
    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    
    public function destroy(string $id)
    {
        //
    }
}
