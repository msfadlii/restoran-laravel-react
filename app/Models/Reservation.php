<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'meja_id',
        'tanggal_reservasi',
        'jumlah_tamu',
        'status_reservasi_id',
        'keterangan',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function meja()
    {
        return $this->belongsTo(Meja::class);
    }

    public function statusReservasi()
    {
        return $this->belongsTo(StatusReservasi::class);
    }
}
