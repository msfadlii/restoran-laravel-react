import { useEffect } from "react";
import { useForm, router, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

export default function EditMenu({ menu, kategori }) {
  const { data, setData, put, processing, errors } = useForm({
    nama: menu?.nama || "",
    kategori: menu?.kategori || "",
    harga: menu?.harga || "",
    deskripsi: menu?.deskripsi || "",
    image: null,
  });

  useEffect(() => {
    if (menu) {
      console.log("Data menu telah tersedia:", menu);
      setData({
        nama: menu.nama,
        kategori: menu.kategori,
        harga: menu.harga,
        deskripsi: menu.deskripsi,
        image: null,
      });
    } else {
      console.log("Data menu belum tersedia");
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
      console.error("ID menu tidak tersedia.");
      return;
    }

    put(route("menu.update", menu.id), {
      onSuccess: () => {
        router.get(route("menu.index"));
      },
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center space-x-2">
          <Link
            href={route("menu.index")}
            className="text-lg text-gray-600 hover:text-white-800 dark:text-gray-200"
          >
            ←
          </Link>
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Edit Menu
          </h2>
        </div>
      }
    >
      <Head title="Edit Menu" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                {/* Input Fields */}
                <div>
                  <label
                    htmlFor="nama"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Nama Menu
                  </label>
                  <TextInput
                    name="nama"
                    value={data.nama}
                    onChange={handleChange}
                    error={errors.nama}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="kategori"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Kategori
                  </label>
                  <SelectInput
                    name="kategori_id"
                    value={data.kategori_id}
                    onChange={handleChange}
                    error={errors.kategori_id}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                  >
                    <option value="">Pilih Kategori</option>
                    {kategori.map((kat) => {
                      <option key="{kat.id}" value={kat.id}>
                        {kat.nama}
                      </option>;
                    })}
                  </SelectInput>
                </div>
                <div>
                  <label
                    htmlFor="harga"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Harga
                  </label>
                  <TextInput
                    name="harga"
                    value={data.harga}
                    onChange={handleChange}
                    type="number"
                    error={errors.harga}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="deskripsi"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Deskripsi
                  </label>
                  <TextInput
                    name="deskripsi"
                    value={data.deskripsi}
                    onChange={handleChange}
                    error={errors.deskripsi}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
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
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-900 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                  />
                  {errors.image && (
                    <div className="mt-2 text-sm text-red-600">
                      {errors.image}
                    </div>
                  )}
                </div>
                <div className="mt-auto flex justify-end">
                  <button
                    type="submit"
                    className="py-2 px-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    disabled={processing}
                  >
                    {processing ? "Menyimpan..." : "Simpan Perubahan"}
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
