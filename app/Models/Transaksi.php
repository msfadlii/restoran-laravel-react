<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    /** @use HasFactory<\Database\Factories\TransaksiFactory> */
    use HasFactory;

    protected $fillable = [
        'order_id',
        'user_id',
        'amount',
        'payment_method',
        'tgl_transaksi',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function user()
{
    return $this->belongsTo(User::class);
}
}
