import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function TransaksiShow({ transaksi }) {
  // Pastikan data transaksi ada dan terstruktur dengan benar
  const { id, user_name, order, amount, payment_method, created_at, status } = transaksi;

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Detail Transaksi #{id}
        </h2>
      }
    >
      <Head title="Detail Transaksi" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Informasi Transaksi</h3>
                  <div className="space-y-2">
                  <div className="space-y-2">
  {/* Tidak perlu menggunakan .map karena data yang diterima adalah objek tunggal */}
  <p><strong>ID Transaksi:</strong> {transaksi.id}</p>
  <p><strong>Nama Pengguna:</strong> {transaksi.user_name || 'Tidak tersedia'}</p>
  <p><strong>ID Order:</strong> {transaksi.order_id || 'Tidak tersedia'}</p>
  <p><strong>Total Harga:</strong> Rp {transaksi.amount}</p>
  <p><strong>Metode Pembayaran:</strong> {transaksi.payment_method}</p>
  <p><strong>Tanggal Transaksi:</strong> {transaksi.created_at}</p>
  <p><strong>Status:</strong> {transaksi.status || 'Tidak ada status'}</p>
</div>

</div>

                </div>

                <div>
                  <h3 className="text-lg font-semibold">Detail Pembayaran</h3>
                  <div className="space-y-2">
                    <p><strong>Amount:</strong> {amount}</p>
                    {/* Bisa tambahkan detail lainnya jika diperlukan */}
                  </div>
                </div>
              </div>

              {/* Link untuk kembali ke daftar transaksi */}
              <div className="mt-6">
                <Link
                  href="/transaksi" // Ganti dengan rute transaksi yang sesuai
                  className="px-4 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
                >
                  Kembali ke Daftar Transaksi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
