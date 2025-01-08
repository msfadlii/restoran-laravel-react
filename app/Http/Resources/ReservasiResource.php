<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservasiResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => $this->user->name,
            'meja' => $this->meja->no_meja,
            'tanggal_reservasi' => $this->tanggal_reservasi,
            'jumlah_tamu' => $this->jumlah_tamu,
            'status_reservasi' => $this->statusReservasi->status,
            'keterangan' => $this->keterangan,
        ];
    }
}
