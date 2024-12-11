import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const sortChanged = (nama) => {
    if (nama === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = nama;
      queryParams.sort_direction = "asc";
    }
    router.get(route("menu.index"), queryParams);
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
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Daftar Menu</h2>
                <Link
                  href={route("menu.create")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Tambah Menu
                </Link>
              </div>
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      <th className="px-3 py-3">Gambar</th>
                      <TableHeading
                        name="nama"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Nama
                      </TableHeading>
                      <TableHeading
                        name="kategori"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Kategori
                      </TableHeading>
                      <TableHeading
                        name="harga"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Harga
                      </TableHeading>
                      <th className="px-3 py-3">Deskripsi</th>
                      <th className="px-3 py-3">Action</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.nama}
                          placeholder="Nama Menu"
                          onBlur={(e) =>
                            searchFieldChanged("nama", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("nama", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.kategori}
                          onChange={(e) =>
                            searchFieldChanged("kategori", e.target.value)
                          }
                        >
                          <option value="">Select Kategori</option>
                          <option value="makanan">Makanan</option>
                          <option value="minuman">Minuman</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {menus.data.map((menu) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-3 py-2">{menu.id}</td>
                        <td className="px-3 py-2">
                          {menu.image ? (
                            <img
                              src={menu.image}
                              alt={menu.nama}
                              style={{ width: 60 }}
                            />
                          ) : (
                            <span>Tidak Ada Gambar</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                          {menu.nama}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {menu.kategori}
                        </td>
                        <td className="px-3 py-2 text-nowrap">{menu.harga}</td>
                        <td className="px-3 py-2 text-nowrap">
                          {menu.deskripsi}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          <Link
                            href={route("menu.edit", menu.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteProject(menu)}
                            className="font-medium text-red-600 
                        dark:text-red-500 hover:underline mx-1"
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
      </div>

      {isModalOpen && (
        <EditModal
          menu={selectedMenu}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}

      <ToastContainer />
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
      onSuccess: () => {
        onClose();
        toast.success("Menu berhasil diperbarui!");
      },
      onError: () => toast.error("Gagal memperbarui menu!"),
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Menu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Kategori
            </label>
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
            {errors.kategori && (
              <span className="text-red-500">{errors.kategori}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Harga
            </label>
            <input
              type="number"
              name="harga"
              value={data.harga}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.harga && (
              <span className="text-red-500">{errors.harga}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              value={data.deskripsi}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
            {errors.deskripsi && (
              <span className="text-red-500">{errors.deskripsi}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gambar
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm border border-gray-300 rounded-md"
            />
            {errors.image && (
              <span className="text-red-500">{errors.image}</span>
            )}
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
