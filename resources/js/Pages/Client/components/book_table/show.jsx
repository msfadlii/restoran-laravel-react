import React from "react";
import { Link } from "@inertiajs/react";

const Index = ({ reservations }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-center mb-6 text-2xl font-semibold text-primary">
          Daftar Reservasi Saya
        </h1>

        {/* Daftar Reservasi */}
        <div className="space-y-4">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="border p-4 rounded-md shadow-sm bg-gray-50"
              >
                <h3 className="font-semibold">{reservation.meja.no_meja}</h3>
                <p><strong>Tanggal:</strong> {new Date(reservation.tanggal_reservasi).toLocaleDateString()}</p>
                <p><strong>Jumlah Tamu:</strong> {reservation.jumlah_tamu}</p>
                <p><strong>Status:</strong> {reservation.statusReservasi.name}</p>
                {reservation.keterangan && (
                  <p><strong>Catatan:</strong> {reservation.keterangan}</p>
                )}
              </div>
            ))
          ) : (
            <p>Anda belum membuat reservasi.</p>
          )}
        </div>

        {/* Kembali ke halaman utama */}
        <div className="mt-6">
          <Link
            href="/beranda"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
