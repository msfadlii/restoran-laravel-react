<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Http\Resources\MenuResource;

class MenuController extends Controller
{
    public function index()
    {
        $query = Menu::query();

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", 'desc');

        if(request("nama")){
            $query->where("nama", "like", "%". request("nama") ."%");
        }
        if(request("kategori")){
            $query->where("kategori", request("kategori"));
        }

        $menus = $query->orderBy($sortField, $sortDirection)->paginate(10);

        return inertia("Menu/Index", [
            "menus" => MenuResource::collection($menus),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    public function create()
    {
        return inertia('Menu/CreateMenu');  // Pastikan ini mengarah ke komponen Inertia React yang benar
    }       

    public function store(Request $request)
    {
    // Validasi data
    $validatedData = $request->validate([
        'nama' => 'required|string|max:255',
        'kategori' => 'required|string',
        'harga' => 'required|numeric',
        'deskripsi' => 'nullable|string',
        'image' => 'nullable|image|max:2048', // Gambar opsional
    ]);

    // Jika ada file gambar, simpan gambar
    if ($request->hasFile('image')) {
        $validatedData['image'] = $request->file('image')->store('menu-images', 'public');
    } else {
        // Jika tidak ada gambar, set image sebagai null
        $validatedData['image'] = null;
    }
}

 
    public function show()
    {
        //
    }

  
    public function edit(string $id)
    {
        return inertia('Menu/EditMenu');
    }

   
    public function update(Request $request, string $id)
    {
        //
    }

    
    public function destroy(string $id)
{
    $menu = Menu::findOrFail($id);

    
    $menu->delete();

    return redirect()->route('menu.index')->with('success', 'Menu berhasil dihapus!');
}
}
