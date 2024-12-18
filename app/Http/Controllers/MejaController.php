<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\MejaResource;
use App\Models\Meja;
use App\Models\StatusMeja;
use Illuminate\Http\Request;

class MejaController extends Controller
{
    public function index()
    {
        
        $query = Meja::query();

        // Sorting field dan direction dengan nilai default
        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", 'desc');

        // Filter berdasarkan status meja jika ada
        if (request("status")) {
            $query->whereHas('statusMeja', function ($q) {
                $q->where('status', request("status"));
            });
        }

        // Ambil data meja dengan relasi dan sorting
        $mejas = $query->with('statusMeja')->orderBy($sortField, $sortDirection)->paginate(10);

        // Return data ke frontend
        return inertia("Meja/Index", [
            "mejas" => MejaResource::collection($mejas),
            "queryParams" => request()->query() ?: null,
        ]);
    }
        public function create()
    {
        // Ambil semua status dari tabel statuses
        $statuses = StatusMeja::all();

        return inertia('Meja/Create', [
            'statuses' => $statuses,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'no_meja' => 'required|numeric|unique:mejas,no_meja',
            'status_meja_id' => 'required',
        ]);

        Meja::create([
            'no_meja' => $request->no_meja,
            'status_meja_id' => $request->status_meja_id,
        ]);
        

        return redirect()->route('meja.index')->with('success', 'Meja berhasil ditambahkan.');
    }
    public function edit($id)
    {
        $meja = Meja::findOrFail($id);
        $statuses = StatusMeja::all();

        return inertia('Meja/Edit', [
            'meja' => $meja,
            'statuses' => $statuses,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'no_meja' => 'required|numeric|unique:mejas,no_meja,' . $id,
            'status_meja_id' => 'required',
        ]);

        $meja = Meja::findOrFail($id);
        $meja->update([
            'no_meja' => $request->no_meja,
            'status_meja_id' => $request->status_meja_id,
        ]);

        return redirect()->route('meja.index')->with('success', 'Meja berhasil diperbarui.');
    }
        public function destroy($id)
    {
        // Mencari meja berdasarkan ID
        $meja = Meja::findOrFail($id);

        // Menghapus meja
        $meja->delete();

        // Mengarahkan kembali ke halaman daftar meja dengan pesan sukses
        return redirect()->route('meja.index')->with('success', 'Meja berhasil dihapus.');
    }

}
