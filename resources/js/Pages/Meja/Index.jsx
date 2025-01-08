import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import SelectInput from "@/Components/SelectInput";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Index({
  mejas = { data: [], meta: { links: [] } },
  statusMeja,
  queryParams = {},
  flash,
}) {
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

  const sortChanged = (nama) => {
    if (nama === queryParams.sort_field) {
      queryParams.sort_direction =
        queryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      queryParams.sort_field = nama;
      queryParams.sort_direction = "asc";
    }
    router.get(route("meja.index"), queryParams);
  };

  const searchFieldChanged = (nama, value) => {
    if (value) {
      queryParams[nama] = value;
    } else {
      delete queryParams[nama];
    }
    router.get(route("meja.index"), queryParams);
  };

  const onKeyPress = (nama, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(nama, e.target.value);
  };

  const handleDelete = (e, id) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    } // Mencegah link melakukan aksi default

    Swal.fire({
      title: "Apakah Anda Yakin ingin Menghapus Meja ?",
      text: "Meja ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route("meja.destroy", id));
      }
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Meja
        </h2>
      }
    >
      <Head title="Meja" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Daftar Meja</h2>
                <Link
                  href={route("meja.create")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Tambah Meja
                </Link>
              </div>
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr>
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      <TableHeading
                        name="no_meja"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Nomor Meja
                      </TableHeading>
                      <th className="px-3 py-3">Status</th>
                      <th className="px-3 py-3">Action</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <SelectInput
                          className="w-50"
                          defaultValue={queryParams.status}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Select Kategori</option>
                          {statusMeja.map((s) => (
                            <option key={s.id} value={s.status}>
                              {s.status}
                            </option>
                          ))}
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mejas.data.length > 0 ? (
                      mejas.data.map((meja) => (
                        <tr
                          key={meja.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-3 py-2">{meja.id}</td>
                          <td className="px-3 py-2">{meja.no_meja}</td>
                          <td className="px-3 py-2">
                            {meja.status_meja?.status || "Tidak Ada Status"}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            <Link
                              href={route("meja.edit", meja.id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={(e) => handleDelete(e, meja.id)}
                              className="font-medium text-red-600 
                              dark:text-red-500 hover:underline mx-1"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center py-4">
                          Tidak ada data meja.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Pagination links={mejas.meta?.links || []} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
