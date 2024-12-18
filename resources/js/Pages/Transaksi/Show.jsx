import React from "react";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show({ transaksi }) {
  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center space-x-2">
          <Link
            href={route("transaksi.index")}
            className="text-lg text-gray-600 hover:text-white-800 dark:text-gray-200"
          >
            ←
          </Link>
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Detail Transaksi
          </h2>
        </div>
      }
    >
      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-lg sm:rounded-lg dark:bg-gray-800">
            <div className="p-8 space-y-8">
              {/* Detail Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  Transaksi #{transaksi.id}
                </h2>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-100 p-6 rounded-lg shadow-sm dark:bg-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Informasi Transaksi
                  </h3>
                  <div className="mt-2 space-y-3">
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Nama Pengguna:</strong>
                      {transaksi.order.user.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>ID Order:</strong> {transaksi.order_id}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Total Harga:</strong> Rp
                      {transaksi.order.total_harga}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Metode Pembayaran:</strong>
                      {transaksi.payment_method}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Total Pembayaran:</strong> Rp {transaksi.amount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
