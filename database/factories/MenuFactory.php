<?php

namespace Database\Factories;

use App\Models\Kategori;
use App\Models\Menu;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Menu>
 */
class MenuFactory extends Factory
{
    protected $model = Menu::class;
    
    public function definition(): array
    {
        return [
            'nama' => $this->faker->word,
            'kategori_id' => Kategori::inRandomOrder()->first()->id,
            'harga' => $this->faker->randomFloat(2, 10000, 50000),
            'deskripsi' => $this->faker->sentence,
            'image' => $this->faker->imageUrl(640, 480, 'food', true),
        ];
    }
}
