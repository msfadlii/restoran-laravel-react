<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_harga',
        'status_order_id',
        'meja_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function transaksi()
    {
        return $this->hasOne(Transaksi::class);
    }
    
    public function meja()
    {
        return $this->belongsTo(Meja::class);
    }

    public function statusOrder()
    {
        return $this->belongsTo(StatusOrder::class, 'status_order_id');
    }
}
