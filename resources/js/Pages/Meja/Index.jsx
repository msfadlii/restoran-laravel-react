import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import SelectInput from "@/Components/SelectInput";

export default function Index({ mejas = { data: [], meta: { links: [] } }, queryParams = {} }) {
  // Default queryParams jika tidak ada
  queryParams = queryParams || {};

  const sortChanged = (nama) => {
    // Mengubah sort_field dan sort_direction berdasarkan klik
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
    // Menambahkan atau menghapus queryParams
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
  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus meja ini?")) {
      router.delete(route("meja.destroy", id));
    }
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
                          <option value="">Pilih Status</option>
                          <option value="Tersedia">Tersedia</option>
                          <option value="Dipesan">Terisi</option>
                        </SelectInput>
                      </th>
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
                          <td className="px-3 py-2">
                            <Link
                              href={route("meja.edit", meja.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Edit
                            </Link>
                          </td>
                          <button
                              onClick={() => handleDelete(meja.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Hapus
                            </button>
                          
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
