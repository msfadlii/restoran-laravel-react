import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ menus, queryParams = null }) {
  queryParams = queryParams || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const openModal = (menu) => {
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMenu(null);
    setIsModalOpen(false);
  };

  const searchFieldChanged = (nama, value) => {
    if (value) {
      queryParams[nama] = value;
    } else {
      delete queryParams[nama];
    }
    router.get(route("menu.index"), queryParams);
  };

  const onKeyPress = (nama, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(nama, e.target.value);
  };

  const deleteMenu = (menu) => {
    if (confirm(`Hapus menu ${menu.nama}?`)) {
      router.delete(route("menu.destroy", menu.id), {
        onSuccess: () => console.log("Menu berhasil dihapus!"),
      });
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Menu
        </h2>
      }
    >
      <Head title="Menu" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="flex justify-between items-center p-6">
              <Link
                href={route("menu.create")}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Tambah Menu
              </Link>
              <div className="flex space-x-4">
                <TextInput
                  className="w-64"
                  defaultValue={queryParams.nama}
                  placeholder="Nama Menu"
                  onBlur={(e) => searchFieldChanged("nama", e.target.value)}
                  onKeyPress={(e) => onKeyPress("nama", e)}
                />
                <SelectInput
                  className="w-64"
                  defaultValue={queryParams.kategori}
                  onChange={(e) => searchFieldChanged("kategori", e.target.value)}
                >
                  <option value="">Select Kategori</option>
                  <option value="makanan">Makanan</option>
                  <option value="minuman">Minuman</option>
                </SelectInput>
              </div>
            </div>
            <div className="overflow-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr>
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Gambar</th>
                    <th className="px-3 py-3">Nama</th>
                    <th className="px-3 py-3">Kategori</th>
                    <th className="px-3 py-3">Harga</th>
                    <th className="px-3 py-3">Deskripsi</th>
                    <th className="px-3 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menus.data.map((menu) => (
                    <tr
                      key={menu.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-3 py-2">{menu.id}</td>
                      <td className="px-3 py-2">
                        <img src={menu.image} alt={menu.nama} style={{ width: 60 }} />
                      </td>
                      <td className="px-3 py-2 text-nowrap">{menu.nama}</td>
                      <td className="px-3 py-2">{menu.kategori}</td>
                      <td className="px-3 py-2">{menu.harga}</td>
                      <td className="px-3 py-2 text-nowrap">{menu.deskripsi}</td>
                      <td className="px-3 py-2 text-right">
                        <button
                          onClick={() => openModal(menu)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteMenu(menu)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination links={menus.meta.links} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <EditModal menu={selectedMenu} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </AuthenticatedLayout>
  );
}

function EditModal({ menu, isOpen, onClose }) {
  const { data, setData, put, processing, errors } = useForm({
    nama: menu.nama || "",
    kategori: menu.kategori || "",
    harga: menu.harga || "",
    deskripsi: menu.deskripsi || "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleFileChange = (e) => {
    setData("image", e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("menu.update", menu.id), {
      onSuccess: () => onClose(),
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Menu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              name="nama"
              value={data.nama}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.nama && <span className="text-red-500">{errors.nama}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Kategori</label>
            <select
              name="kategori"
              value={data.kategori}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Pilih Kategori</option>
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
            </select>
            {errors.kategori && <span className="text-red-500">{errors.kategori}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Harga</label>
            <input
              type="number"
              name="harga"
              value={data.harga}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.harga && <span className="text-red-500">{errors.harga}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={data.deskripsi}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.deskripsi && <span className="text-red-500">{errors.deskripsi}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gambar</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm border border-gray-300 rounded-md"
            />
            {errors.image && <span className="text-red-500">{errors.image}</span>}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
