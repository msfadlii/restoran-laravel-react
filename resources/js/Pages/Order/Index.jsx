import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { ORDER_STATUS_CLASS_MAP, ORDER_STATUS_TEXT_MAP } from "@/constants";
import { useState } from "react";
//hehhee
export default function index({
  orders,
  orderItems,
  statusOrders,
  queryParams = null,
}) {
  queryParams = queryParams || {};

  const searchFieldChanged = (nama, value) => {
    if (value) {
      queryParams[nama] = value;
    } else {
      delete queryParams[nama];
    }

    router.get(route("order.index"), queryParams);
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
    router.get(route("order.index"), queryParams);
  };

  const [selectedRow, setSelectedRow] = useState(null);

  const toggleRow = (id) => {
    //Jika baris diklik tutup detail
    if (selectedRow === id) {
      setSelectedRow(null);
    } else {
      setSelectedRow(id);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Order
        </h2>
      }
    >
      <Head title="Order" />
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
                        name="user_id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        User ID
                      </TableHeading>
                      <TableHeading
                        name="meja"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Meja
                      </TableHeading>
                      <TableHeading
                        name="total_harga"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Total Harga
                      </TableHeading>
                      <TableHeading
                        name="status"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Status
                      </TableHeading>
                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Create Date
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
                          defaultValue={queryParams.status}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          {statusOrders.map((status) => (
                            <option key={status.id} value={status.status}>
                              {status.status}
                            </option>
                          ))}
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.data.map((order) => (
                      <>
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={order.id}
                          onClick={() => toggleRow(order.id)}
                        >
                          <td className="px-3 py-2">{order.id}</td>
                          <td className="px-3 py-2 text-nowrap">
                            {order.user_id}
                          </td>
                          <td className="px-3 py-2">
                            {order.meja || "Tidak ada"}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            {order.total_harga}
                          </td>
                          <td className="px-3 py-2">{order.status}</td>
                          <td className="px-3 py-2 text-nowrap">
                            {order.created_at}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            <Link
                              href={route("order.show", order.id)}
                              className="font-medium text-orange-600 dark:text-orange-500 hover:underline mx-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Detail
                            </Link>
                            <Link
                              href={route("order.edit", order.id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Edit
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteProject(order);
                              }}
                              className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                        {selectedRow === order.id && (
                          <tr className="bg-gray-100 dark:bg-gray-700">
                            <td
                              colSpan="6"
                              className="px-3 py-2 text-gray-700 dark:text-gray-200"
                            >
                              <div>
                                <strong>Detail Order : </strong>
                                {orderItems?.filter(
                                  (item) => item.order_id === order.id
                                ).length > 0 ? (
                                  orderItems
                                    .filter(
                                      (item) => item.order_id === order.id
                                    )
                                    .map((item) => (
                                      <div key={item.id} className="mt-2">
                                        <hr className="border-t-2 border-gray-300 dark:border-gray-600 mt-2" />
                                        <p>
                                          <strong>Menu:</strong>{" "}
                                          {item.menu?.nama || "N/A"}
                                        </p>
                                        <p>
                                          <strong>Quantity:</strong>{" "}
                                          {item.quantity}
                                        </p>
                                        <p>
                                          <strong>Harga:</strong> Rp.{" "}
                                          {item.menu.harga}
                                        </p>
                                      </div>
                                    ))
                                ) : (
                                  <p>
                                    Tidak ada detail untuk Order ID {order.id}.
                                  </p>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={orders.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
