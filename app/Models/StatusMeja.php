<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusMeja extends Model
{
    use HasFactory;

    protected $fillable = ['status'];

    public function meja()
    {
        return $this->hasMany(Meja::class);
    }
}
