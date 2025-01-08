<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransaksiResource;
use App\Models\Transaksi;
use Illuminate\Http\Request;

namespace App\Http\Controllers;

use App\Http\Resources\TransaksiResource;
use App\Models\PaymentMethod;
use App\Models\Transaksi;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function index()
    {
        $query = Transaksi::query();
        $paymentMethod = PaymentMethod::all();

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", 'desc');

        if (request("payment_method")) {
            $query->whereHas('paymentMethod', function($query) {
                $query->where('nama', request("payment_method"));
            });
        }

        if (request("tgl_transaksi")) {
            $query->whereDate("tgl_transaksi", request("tgl_transaksi"));
        }

        $transaksis = $query->with(['order.user'])  
                            ->orderBy($sortField, $sortDirection)
                            ->paginate(10);

        return inertia("Transaksi/Index", [
            "transaksis" => TransaksiResource::collection($transaksis),
            "queryParams" => request()->query() ?: null,
            "paymentMethod" => $paymentMethod,
        ]);
    }

    public function show($id)
    {
        $transaksi = Transaksi::with(['order.user'])->findOrFail($id);

        return inertia('Transaksi/Show', [
            'transaksi' => $transaksi,
        ]);
    }

    public function update(Request $request, $id)
    {
        $transaksi = Transaksi::findOrFail($id);

        $validatedData = $request->validate([
            'amount' => 'required|numeric',
            'payment_method' => 'required|string',
        ]);

        $transaksi->update($validatedData);

        return redirect()->route('transaksis.index')->with('success', 'Transaksi updated successfully.');
    }

    public function destroy($id)
    {
        $transaksi = Transaksi::findOrFail($id);
        $transaksi->delete();

        return redirect()->route('transaksis.index')->with('success', 'Transaksi deleted successfully.');
    }
}
