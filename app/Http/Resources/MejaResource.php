<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MejaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'no_meja' => $this->no_meja,
            'status_meja' => $this->statusMeja ? [
                'id' => $this->statusMeja->id,
                'status' => $this->statusMeja->status,
            ] : null,
        ];
    }
}
