<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    use HasFactory;

    protected $fillable = ['nama'];
    
    public function menus()
    {
        return $this->hasMany(Menu::class, 'kategori_id');
    }
}
