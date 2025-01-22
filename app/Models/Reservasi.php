<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reservasi extends Model
{
    use HasFactory;
    protected $table = 'reservations';

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
        return $this->belongsTo(StatusReservasi::class, 'status_reservasi_id');
    }
}
