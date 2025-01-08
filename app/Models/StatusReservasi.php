<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusReservasi extends Model
{
    use HasFactory;

    protected $table = 'status_reservasi'; 

    protected $fillable = ['status'];

    public function reservation()
    {
        return $this->hasMany(Reservation::class);
    }
}
