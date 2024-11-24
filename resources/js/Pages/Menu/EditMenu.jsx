import { useEffect } from "react";
import { useForm, router } from "@inertiajs/react";

export default function EditMenu({ menu }) {
  const { data, setData, put, processing, errors } = useForm({
    nama: menu?.nama || "",
    kategori: menu?.kategori || "",
    harga: menu?.harga || "",
    deskripsi: menu?.deskripsi || "",
    image: null,
  });

  useEffect(() => {
    if (menu) {
      setData({
        nama: menu.nama,
        kategori: menu.kategori,
        harga: menu.harga,
        deskripsi: menu.deskripsi,
        image: null,
      });
    }
  }, [menu]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleFileChange = (e) => {
    setData("image", e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!menu || !menu.id) {
      console.error("Menu ID is not available.");
      return;
    }

    put(route("menu.update", menu.id), {
      onSuccess: () => {
        router.get(route("menu.index"));
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Edit Menu
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nama */}
        <div>
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nama Menu
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={data.nama}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan nama menu"
          />
          {errors.nama && <div className="text-red-500 text-sm mt-1">{errors.nama}</div>}
        </div>

        {/* Kategori */}
        <div>
          <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Kategori
          </label>
          <select
            id="kategori"
            name="kategori"
            value={data.kategori}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Pilih Kategori</option>
            <option value="makanan">Makanan</option>
            <option value="minuman">Minuman</option>
          </select>
          {errors.kategori && <div className="text-red-500 text-sm mt-1">{errors.kategori}</div>}
        </div>

        {/* Harga */}
        <div>
          <label htmlFor="harga" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Harga
          </label>
          <input
            type="number"
            id="harga"
            name="harga"
            value={data.harga}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan harga"
          />
          {errors.harga && <div className="text-red-500 text-sm mt-1">{errors.harga}</div>}
        </div>

        {/* Deskripsi */}
        <div>
          <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Deskripsi
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={data.deskripsi}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan deskripsi menu"
            rows={4}
          />
          {errors.deskripsi && <div className="text-red-500 text-sm mt-1">{errors.deskripsi}</div>}
        </div>

        {/* Image */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Gambar Menu
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="mt-2 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
        </div>

        {/* Button */}
        <div className="text-right">
          <button
            type="submit"
            disabled={processing}
            className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {processing ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
