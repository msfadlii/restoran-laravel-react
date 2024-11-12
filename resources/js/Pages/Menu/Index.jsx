import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function index({ menus, queryParams = null }) {
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
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3">ID</th>
                      <th className="px-3 py-3">Gambar</th>
                      <th className="px-3 py-3">Nama</th>
                      <th className="px-3 py-3">Kategori</th>
                      <th className="px-3 py-3">Harga</th>
                      <th className="px-3 py-3">Deskripsi</th>
                      <th className="px-3 py-3 text-right">Action</th>
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
                          <img src={menu.image} style={{ width: 60 }} />
                        </td>
                        <td className="px-3 py-2 text-nowrap">{menu.nama}</td>
                        <td className="px-3 py-2 text-nowrap">
                          {menu.kategori}
                        </td>
                        <td className="px-3 py-2 text-nowrap">{menu.harga}</td>
                        <td className="px-3 py-2 text-nowrap">
                          {menu.deskripsi}
                        </td>
                        <td className="px-3 py-2">
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
    </AuthenticatedLayout>
  );
}
