<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Http\Resources\MenuResource;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Menu::query();

        if(request("nama")){
            $query->where("nama", "like", "%". request("nama") ."%");
        }
        if(request("kategori")){
            $query->where("kategori", request("kategori"));
        }

        $menus = $query->paginate(10);

        return inertia("Menu/Index", [
            "menus" => MenuResource::collection($menus),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Menu/CreateMenu');  // Pastikan ini mengarah ke komponen Inertia React yang benar
    }       

    /**
     * Store a newly created resource in storage.
     */
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

    // Simpan menu ke database
    Menu::create($validatedData);

    // Redirect setelah sukses
    return redirect()->route('menu.index')->with('success', 'Menu berhasil ditambahkan!');
}




    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        return inertia('Menu/EditMenu');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
{
    $menu = Menu::findOrFail($id);

    $validatedData = $request->validate([
        'nama' => 'required|string|max:255',
        'kategori' => 'required|string',
        'harga' => 'required|numeric',
        'deskripsi' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Opsional
    ]);

    // Perbarui data
    $menu->nama = $validatedData['nama'];
    $menu->kategori = $validatedData['kategori'];
    $menu->harga = $validatedData['harga'];
    $menu->deskripsi = $validatedData['deskripsi'];

    // Periksa apakah gambar baru diunggah
    if ($request->hasFile('image')) {
        // Hapus gambar lama jika ada
        if ($menu->image) {
            $menu->delete();;
        }

        // Simpan gambar baru
        $menu->image = $request->file('image')->store('images/menus');
    }

    // Simpan perubahan
    $menu->save();

    return redirect()->route('menu.index')->with('success', 'Menu berhasil diperbarui!');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    $menu = Menu::findOrFail($id);

    
    $menu->delete();

    return redirect()->route('menu.index')->with('success', 'Menu berhasil dihapus!');
}
}
