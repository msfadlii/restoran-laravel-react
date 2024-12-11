import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { useState } from "react";

export default function TransaksiIndex({ transaksis, queryParams = null }) {
  queryParams = queryParams || {};

  // Fungsi untuk menangani perubahan filter
  const searchFieldChanged = (nama, value) => {
    if (value) {
      queryParams[nama] = value;
    } else {
      delete queryParams[nama];
    }

    router.get(route("transaksi.index"), queryParams);
  };

  const onKeyPress = (nama, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(nama, e.target.value);
  };

  const sortChanged = (nama) => {
    if (nama === queryParams.sort_field) {
      queryParams.sort_direction = queryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      queryParams.sort_field = nama;
      queryParams.sort_direction = "desc";
    }
    router.get(route("transaksi.index"), queryParams);
  };

  const [selectedRow, setSelectedRow] = useState(null);

  const toggleRow = (id) => {
    setSelectedRow(selectedRow === id ? null : id);
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Transaksi
        </h2>
      }
    >
      <Head title="Transaksi" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
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
                      <TableHeading
                        name="order_id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                       Order ID
                      </TableHeading>
                      <TableHeading
                        name="payment_method"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Payment Method
                      </TableHeading>
                      <TableHeading
                        name="amount"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Total Harga
                      </TableHeading>
                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Tanggal Transaksi
                      </TableHeading>
                      <th className="px-3 py-3">Action</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.payment_method || ""}
                          onChange={(e) =>
                            searchFieldChanged("payment_method", e.target.value)
                          }
                        >
                          <option value="">Select Payment Method</option>
                          <option value="cash">Cash</option>
                          <option value="bank_transfer">Bank Transfer</option>
                        </SelectInput>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaksis.data.map((transaksi) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={transaksi.id}
                        onClick={() => toggleRow(transaksi.id)}
                      >
                        <td className="px-3 py-2">{transaksi.id}</td>
                        <td className="px-3 py-2 text-nowrap">{transaksi.order_id}</td>
                        <td className="px-3 py-2 text-nowrap">{transaksi.payment_method}</td>
                        <td className="px-3 py-2 text-nowrap">Rp. {transaksi.amount}</td>
                        <td className="px-3 py-2 text-nowrap">{transaksi.created_at}</td>
                        <td className="px-3 py-2 text-nowrap">
                          <Link
                            href={route("transaksi.show", transaksi.id)}
                            className="font-medium text-orange-600 dark:text-orange-500 hover:underline mx-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Detail
                          </Link>
                          <Link
                            href={route("transaksi.edit", transaksi.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTransaction(transaksi);
                            }}
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
              <Pagination links={transaksis.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
