<?php

namespace App\Http\Controllers;

use App\Models\Meja;
use App\Models\Reservasi;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LandingPageController extends Controller
{
    public function create()
    {
        return Inertia::render('Client/components/landing page/landingPage');
    }

    public function book_meja()
    {
        $mejas = Meja::all();

        return Inertia::render('Client/components/book_table/Index', [
            'mejas' => $mejas,
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
            'date' => 'required|date',
            'guests' => 'required|integer|min:1',
            'notes' => 'nullable|string',
        ]);
    
        Reservasi::create([
            'user_id' => $request->user_id,
            'meja_id' => $request->meja_id,
            'tanggal_reservasi' => $request->date,
            'jumlah_tamu' => $request->guests,
            'keterangan' => $request->notes,
            'status_reservasi_id' => 1,
        ]);
    
        return redirect()->route('beranda')->with('flash', ['success' => 'Reservasi berhasil!']);
    }

}
