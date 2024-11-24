import { useState } from "react";
import { useForm, Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

export default function CreateMenu() {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        kategori: '',
        harga: '',
        deskripsi: '',
        image: null,
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    // Handle image file change
    const handleFileChange = (e) => {
        setData('image', e.target.files[0]);
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("menu.store"), {
            onSuccess: () => {
                // Redirect to the index page after successful creation
                router.get(route('menu.index'));
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Tambah Menu
                </h2>
            }
        >
            <Head title="Tambah Menu" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label
                                            htmlFor="nama"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Nama Menu
                                        </label>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                            Masukkan nama menu yang ingin ditambahkan.
                                        </p>
                                        <TextInput
                                            label="Nama Menu"
                                            name="nama"
                                            value={data.nama}
                                            onChange={handleChange}
                                            error={errors.nama}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="kategori"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Kategori
                                        </label>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                            Pilih kategori menu, seperti Makanan atau Minuman.
                                        </p>
                                        <SelectInput
                                            label="Kategori"
                                            name="kategori"
                                            value={data.kategori}
                                            onChange={handleChange}
                                            error={errors.kategori}
                                        >
                                            <option value="">Pilih Kategori</option>
                                            <option value="makanan">Makanan</option>
                                            <option value="minuman">Minuman</option>
                                        </SelectInput>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="harga"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Harga
                                        </label>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                            Masukkan harga menu dalam bentuk angka.
                                        </p>
                                        <TextInput
                                            label="Harga"
                                            name="harga"
                                            value={data.harga}
                                            onChange={handleChange}
                                            type="number"
                                            error={errors.harga}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="deskripsi"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Deskripsi
                                        </label>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                            Deskripsikan menu untuk memberikan informasi lebih lanjut.
                                        </p>
                                        <TextInput
                                            label="Deskripsi"
                                            name="deskripsi"
                                            value={data.deskripsi}
                                            onChange={handleChange}
                                            error={errors.deskripsi}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Gambar
                                        </label>
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleFileChange}  // Pastikan ini menangani file upload dengan benar
                                            className="mt-1 block w-full text-sm text-gray-900 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                                        />
                                        {errors.image && (
                                            <div className="mt-2 text-sm text-red-600">{errors.image}</div>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center py-2 px-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                        disabled={processing}
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Menu'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
