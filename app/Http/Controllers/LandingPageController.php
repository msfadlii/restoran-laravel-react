<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Meja;
use App\Models\Reservasi;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function create()
    {
        return Inertia::render('Client/components/landing page/landingPage');
    }

    public function book_meja()
    {
        $mejas = Meja::all();
        $userId = Auth::user();

        return Inertia::render('Client/components/book_table/Index', [
            'mejas' => $mejas,
            'user_id' => $userId,
        ]);
    }

    public function beranda()
    {
        $userId = Auth::user();
        return Inertia::render('Client/components/landing page/loggedPage', [
            'user_id' => $userId,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'meja_id' => 'required|exists:mejas,id',
            'date' => 'required|date_format:Y-m-d\TH:i',
            'guests' => 'required|integer|min:1',
            'notes' => 'nullable|string',
        ]);
        $user_id = Auth::id();
    
        Reservasi::create([
            'user_id' => $user_id,
            'meja_id' => $request->meja_id,
            'tanggal_reservasi' => $request->date,
            'jumlah_tamu' => $request->guests,
            'status_reservasi_id' => 1,
            'keterangan' => $request->notes,
        ]);
    
        return redirect()->route('beranda')->with('flash', ['success' => 'Reservasi berhasil!']);
    }
    public function show()
    {
        // Ambil semua reservasi milik pengguna yang sedang login
        $reservations = Reservasi::where('user_id', Auth::id())->get();

        // Kirim data reservasi ke tampilan React (Inertia)
        return Inertia::render('Client/components/book_table/show', [
            'reservations' => $reservations,
        ]);
    }

}
