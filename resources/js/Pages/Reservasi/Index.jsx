import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { useState } from "react";

export default function Index({ reservations, status, queryParams = null }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (nama, value) => {
    const updatedQueryParams = { ...queryParams };
    if (value) {
      updatedQueryParams[nama] = value;
    } else {
      delete updatedQueryParams[nama];
    }
    router.get(route("reservasi.index"), updatedQueryParams, {
      preserveState: true,
    });
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
    router.get(route("reservasi.index"), queryParams);
  };

  const [selectedRow, setSelectedRow] = useState(null);

  const toggleRow = (id) => {
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
          Reservation
        </h2>
      }
    >
      <Head title="Reservation" />
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
                      <th className="px-3 py-3">Nama Customer</th>
                      <TableHeading
                        name="meja_id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Meja
                      </TableHeading>
                      <TableHeading
                        name="jumlah_tamu"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Jumlah Tamu
                      </TableHeading>
                      <th className="px-3 py-3">Status</th>
                      <TableHeading
                        name="tanggal_reservasi"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Tanggal
                      </TableHeading>
                      <th className="px-3 py-3">Action</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.user}
                          placeholder="Nama Customer"
                          onBlur={(e) =>
                            searchFieldChanged("user", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("user", e)}
                        />
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status_reservasi}
                          onChange={(e) =>
                            searchFieldChanged(
                              "status_reservasi",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select Status</option>
                          {status.map((st) => (
                            <option key={st.id} value={st.status}>
                              {st.status}
                            </option>
                          ))}
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.data.map((reservation) => (
                      <>
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={reservation.id}
                          onClick={() => toggleRow(reservation.id)}
                        >
                          <td className="px-3 py-2">{reservation.id}</td>
                          <td className="px-3 py-2 text-nowrap">
                            {reservation.user}
                          </td>
                          <td className="px-3 py-2">
                            {reservation.meja || "Tidak ada"}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            {reservation.jumlah_tamu}
                          </td>
                          <td className="px-3 py-2">
                            {reservation.status_reservasi}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            {reservation.tanggal_reservasi}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            <Link
                              href={route("reservasi.show", reservation.id)}
                              className="font-medium text-orange-600 dark:text-orange-500 hover:underline mx-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Detail
                            </Link>
                            <Link
                              href={route("reservasi.edit", reservation.id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Edit
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteProject(reservation);
                              }}
                              className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                        {selectedRow === reservation.id && (
                          <tr className="bg-gray-100 dark:bg-gray-700">
                            <td
                              colSpan="6"
                              className="px-3 py-2 text-gray-700 dark:text-gray-200"
                            >
                              <div>
                                <strong>Detail Reservasi: </strong>
                                <p>
                                  <strong>Tanggal Reservasi:</strong>{" "}
                                  {reservation.tanggal_reservasi}
                                </p>
                                <p>
                                  <strong>Jumlah Tamu:</strong>{" "}
                                  {reservation.jumlah_tamu}
                                </p>
                                <p>
                                  <strong>Status:</strong>{" "}
                                  {reservation.status_reservasi?.status}
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={reservations.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
