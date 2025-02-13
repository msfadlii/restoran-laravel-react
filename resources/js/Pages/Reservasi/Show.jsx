import React from "react";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show({ reservasi }) {
  // Log data reservasi untuk memverifikasi
  console.log("Reservasi Data:", reservasi);

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center space-x-2">
          <Link
            href={route("reservasi.index")}
            className="text-lg text-gray-600 hover:text-white-800 dark:text-gray-200"
          >
            ←
          </Link>
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Detail Reservasi
          </h2>
        </div>
      }
    >
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Detail Reservasi #{reservasi.id}
              </h2>
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Pelanggan:</strong> {reservasi.user.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Tanggal Reservasi:</strong>{" "}
                  {reservasi.tanggal_reservasi}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Status:</strong> {reservasi.status_reservasi.status}
                </p>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Menu yang Dipesan
                </h3>
                <table className="w-full mt-2 text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-3 py-3">Menu</th>
                      <th className="px-3 py-3">Jumlah</th>
                      <th className="px-3 py-3">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservasi?.user?.orders?.[0]?.order_items?.length > 0 ? (
                      reservasi.user.orders[0].order_items.map(
                        (orderItem, index) => (
                          <tr key={index}>
                            <td className="px-3 py-3">
                              {orderItem.menu?.nama}
                            </td>
                            <td className="px-3 py-3">{orderItem.quantity}</td>
                            <td className="px-3 py-3">
                              {orderItem.menu?.harga}
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-3 py-3 text-center">
                          Tidak ada menu yang dipesan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Edit Button to navigate to the Edit Page */}
              <div className="mt-6">
                <Link
                  href={`/reservasi/${reservasi.id}/edit`} // Assuming you have a route to edit the reservation
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Edit Reservasi
                </Link>
              </div>

              <div className="mt-4">
                <Link
                  href="/reservasi"
                  className="px-4 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
                >
                  Kembali ke Daftar Reservasi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
