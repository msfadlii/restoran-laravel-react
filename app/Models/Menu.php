<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    /** @use HasFactory<\Database\Factories\MenuFactory> */
    use HasFactory;

    protected $fillable = [
        'nama',
        'kategori',
        'harga',
        'deskripsi',
        'image',
    ];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
