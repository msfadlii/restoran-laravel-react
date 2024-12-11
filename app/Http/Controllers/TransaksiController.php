<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransaksiResource;
use App\Models\Transaksi;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function index()
    {
        $query = Transaksi::query();

        // Sorting berdasarkan field tertentu
        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", 'desc');

        // Filter berdasarkan metode pembayaran dan tanggal transaksi
        if (request("payment_method")) {
            $query->where("payment_method", "like", "%" . request("payment_method") . "%");
        }

        if (request("tgl_transaksi")) {
            $query->whereDate("tgl_transaksi", request("tgl_transaksi"));
        }

        // Pagination
        $transaksis = $query->orderBy($sortField, $sortDirection)->paginate(10);

        // Mengembalikan data ke Inertia.js
        return inertia("Transaksi/Index", [
            "transaksis" => TransaksiResource::collection($transaksis),
            "queryParams" => request()->query() ?: null,
        ]);
    }
    public function show($id)
    {
         // Mengambil transaksi berdasarkan ID
        $transaksi = Transaksi::with(['order', 'user'])->findOrFail($id);
        return inertia('Transaksi/Show', [
            'transaksi' => new TransaksiResource($transaksi),
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
