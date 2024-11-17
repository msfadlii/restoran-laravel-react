import React from 'react';
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { toast } from 'react-toastify';  // Make sure toast is imported

export default function Index({ orders }) {
  const orderList = orders.data || []; // Ambil data pesanan

  const deleteOrder = (order) => {
    if (confirm(`Hapus order dengan ID ${order.id}?`)) {
      Inertia.delete(route("order.destroy", order.id), {
        onSuccess: () => {
          toast.success("Order berhasil dihapus!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        },
        onError: () => {
          toast.error("Gagal menghapus order.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        }
      });
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Daftar Pesanan
        </h2>
      }
    >
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-white">Daftar Pesanan</h2>
              <table className="w-full mt-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr>
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Customer</th>
                    <th className="px-3 py-3">Total Harga</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList.map((order) => (
                    <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-3 py-2">{order.id}</td>
                      <td className="px-3 py-2">{order.user.name}</td>
                      <td className="px-3 py-2">{order.total_harga}</td>
                      <td className="px-3 py-2">{order.status}</td>
                      <td className="px-3 py-2 text-right">
                        {/* Link untuk melihat detail pesanan */}
                        <Link href={`/order/${order.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Lihat Detail
                        </Link>
                        {/* Tombol untuk menghapus pesanan */}
                        <button
                          onClick={() => deleteOrder(order)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
