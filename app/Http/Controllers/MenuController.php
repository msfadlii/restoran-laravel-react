<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Http\Resources\MenuResource;
use App\Models\Kategori;
use Illuminate\Support\Facades\Log;

class MenuController extends Controller
{
    public function index()
    {
        $query = Menu::query();
        $kategori = Kategori::all();

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", 'desc');

        if(request("nama")){
            $query->where("nama", "like", "%". request("nama") ."%");
        }
        if (request("kategori")) {
            $query->whereHas('kategori', function ($q) {
                $q->where('nama', request('kategori'));
            });
        }

        $menus = $query->orderBy($sortField, $sortDirection)->paginate(10);

        return inertia("Menu/Index", [
            "menus" => MenuResource::collection($menus),
            "queryParams" => request()->query() ?: null,
            "kategori" => $kategori
        ]);
    }

    public function create()
    {
        return inertia('Menu/CreateMenu');
    }       

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategoris,id',
            'harga' => 'required|numeric',
            'deskripsi' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $menu = new Menu();
        $menu->nama = $request->nama;
        $menu->kategori_id = $request->kategori_id;
        $menu->harga = $request->harga;
        $menu->deskripsi = $request->deskripsi;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('menu-images', 'public');
            $menu->image = $imagePath;
        } else {
            $menu->image = null;
        }

        $menu->save();
        
        return redirect()->route('menu.index')->with('flash', ['success' => 'Menu berhasil ditambahkan!']);
    }

 
    public function show()
    {
        
    }

  
    public function edit(string $id)
    {
        $menu = Menu::findOrFail($id);
        $kategori = Kategori::all();


        return inertia('Menu/EditMenu', [
            'menu' => $menu,
            'kategori' => $kategori
        ]);
    }

   
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategoris,id',
            'harga' => 'required|numeric',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $menu = Menu::find($id);

        if (!$menu) {
            return redirect()->route('menu.index')->with('flash', ['error' => 'Menu tidak ditemukan!']);
        }

        $menu->nama = $validatedData['nama'];
        $menu->kategori_id = $validatedData['kategori_id'];
        $menu->harga = $validatedData['harga'];
        $menu->deskripsi = $validatedData['deskripsi'] ?? $menu->deskripsi;

        if ($request->hasFile('gambar')) {
            if ($menu->gambar && file_exists(public_path('images/' . $menu->gambar))) {
                unlink(public_path('images/' . $menu->gambar));
            }

            $gambar = $request->file('gambar');
            $gambarPath = $gambar->store('images', 'public');
            $menu->gambar = basename($gambarPath);
        }

        $menu->save();

        return redirect()->route('menu.index')->with('flash', ['success' => 'Menu berhasil diupdate!']);
    }
    
    public function destroy(string $id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();

        return redirect()->route('menu.index')->with('success', 'Menu berhasil dihapus!');
    }
}
