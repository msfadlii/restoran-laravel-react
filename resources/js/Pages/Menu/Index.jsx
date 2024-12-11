import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function Index({ menus, queryParams = null, flash }) {
  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (flash?.error) {
      toast.error(flash.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [flash]);

  queryParams = queryParams || {};

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

  const handleDelete = (e) => {
    e.preventDefault(); // Mencegah link melakukan aksi default

    Swal.fire({
      title: "Apakah Anda Yakin ingin Menghapus Menu ?",
      text: "Menu ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route("menu.destroy", id), {
          onSuccess: () => {
            toast.success("Menu berhasil dihapus!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          },
        });
      }
    });
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
                          <Link
                            href="#"
                            onClick={handleDelete}
                            className="font-medium text-red-600 
                        dark:text-red-500 hover:underline mx-1"
                          >
                            Delete
                          </Link>
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
    </AuthenticatedLayout>
  );
}
