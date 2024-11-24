import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ order }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Detail Pesanan #{order.id}
        </h2>
      }
    >
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Detail Pesanan
              </h2>
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Customer:</strong> {order.user.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Status:</strong> {order.status}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Total Harga:</strong> Rp {order.total_harga}
                </p>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Items</h3>
                <table className="w-full mt-2 text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-3 py-3">Menu</th>
                      <th className="px-3 py-3">Quantity</th>
                      <th className="px-3 py-3">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_items.map((item) => (
                      <tr
                        key={item.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-3 py-2">{item.menu.nama}</td>
                        <td className="px-3 py-2">{item.quantity}</td>
                        <td className="px-3 py-2">Rp {item.harga}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Edit Button to navigate to the Edit Page */}
              <div className="mt-6">
                <Link
                  href={`/order/${order.id}/edit`}  // Assuming you have a route to edit the order
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Edit Pesanan
                </Link>
              </div>

              {/* Back Button */}
              <div className="mt-4">
                <Link
                  href="/order"
                  className="px-4 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
                >
                  Kembali ke Daftar Pesanan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
