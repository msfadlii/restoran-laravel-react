<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meja extends Model
{
    use HasFactory;

    protected $fillable = ['no_meja', 'status_meja_id'];

    public function statusMeja()
    {
        return $this->belongsTo(StatusMeja::class, 'status_meja_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
