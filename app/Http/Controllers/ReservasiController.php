<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservasiResource;
use App\Models\Meja;
use App\Models\Reservation;
use App\Models\StatusReservasi;
use App\Models\User;
use Illuminate\Http\Request;

class ReservasiController extends Controller
{
    public function index()
    {
        $query = Reservation::query();
        $status = StatusReservasi::all();

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", 'desc');

        if(request("user")){
            $query->whereHas('user', function ($q) {
                $q->where('name', 'like', "%" . request("user") . "%");
            });
        }
        
        if (request("status_reservasi")) {
            $query->whereHas('statusReservasi', function ($q) {
                $q->where('status', request('status_reservasi'));
            });
        }

        $reservations = $query->with(['user', 'meja', 'statusReservasi'])->orderBy($sortField, $sortDirection)->paginate(10);

        return inertia("Reservasi/Index", [
            "reservations" => ReservasiResource::collection($reservations),
            "queryParams" => request()->query() ?: null,
            "status" => $status,
        ]);
    }

    public function create()
    {
        $meja = Meja::all();
        $status = StatusReservasi::all();
        $users = User::all();

        return inertia("Reservasi/Create", [
            "meja" => $meja,
            "status" => $status,
            "users" => $users,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'meja_id' => 'required|exists:mejas,id',
            'tanggal_reservasi' => 'required|date',
            'jumlah_tamu' => 'required|integer',
            'status_reservasi_id' => 'required|exists:status_reservasis,id',
            'keterangan' => 'nullable|string',
        ]);

        $reservation = new Reservation();
        $reservation->user_id = $request->user_id;
        $reservation->meja_id = $request->meja_id;
        $reservation->tanggal_reservasi = $request->tanggal_reservasi;
        $reservation->jumlah_tamu = $request->jumlah_tamu;
        $reservation->status_reservasi_id = $request->status_reservasi_id;
        $reservation->keterangan = $request->keterangan;
        
        $reservation->save();

        return redirect()->route('reservasi.index')->with('flash', ['success' => 'Reservasi berhasil ditambahkan!']);
    }

    public function show($id)
    {
        $reservation = Reservation::with(['user.orders.orderItems.menu', 'statusReservasi'])->findOrFail($id);
        // dd($reservation->statusReservasi);
        return inertia('Reservasi/Show', [
            'reservasi' => $reservation,
        ]);
    }

    public function edit(string $id)
    {
        $reservation = Reservation::findOrFail($id);
        $meja = Meja::with('statusMeja')->get();
        $status = StatusReservasi::all();
        $users = User::all();

        return inertia('Reservasi/Edit', [
            'reservation' => $reservation,
            'meja' => $meja,
            'status' => $status,
            'users' => $users,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'meja_id' => 'required|exists:mejas,id',
            'tanggal_reservasi' => 'required|date',
            'jumlah_tamu' => 'required|integer',
            'status_reservasi_id' => 'required|exists:status_reservasis,id',
            'keterangan' => 'nullable|string',
        ]);

        $reservation = Reservation::find($id);

        if (!$reservation) {
            return redirect()->route('reservasi.index')->with('flash', ['error' => 'Reservasi tidak ditemukan!']);
        }

        $reservation->user_id = $validatedData['user_id'];
        $reservation->meja_id = $validatedData['meja_id'];
        $reservation->tanggal_reservasi = $validatedData['tanggal_reservasi'];
        $reservation->jumlah_tamu = $validatedData['jumlah_tamu'];
        $reservation->status_reservasi_id = $validatedData['status_reservasi_id'];
        $reservation->keterangan = $validatedData['keterangan'] ?? $reservation->keterangan;

        $reservation->save();

        return redirect()->route('reservasi.index')->with('flash', ['success' => 'Reservasi berhasil diupdate!']);
    }

    public function destroy(string $id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return redirect()->route('reservasi.index')->with('success', 'Reservasi berhasil dihapus!');
    }
}
