<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class TransaksiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'amount' => $this->amount,
            'payment_method' => $this->payment_method,
            'created_at' => Carbon::parse($this->created_at)->format('d-m-Y H:i:s'),
            // Menambahkan nama pengguna dari relasi order
            'user_name' => $this->user->name,
        ];
    }
}
