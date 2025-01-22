import React from "react";
import { useForm, Link, router } from "@inertiajs/react";

const Index = ({ mejas, user_id }) => {
  const { data, setData, post, processing, errors } = useForm({
    user_id: user_id?.id || "",
    meja_id: "",
    date: "",
    guests: "",
    notes: "",
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    post(route("reservasi-meja"), {
      onSuccess: () => {
        router.get(route("beranda"));
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-center mb-6 text-2xl font-semibold text-primary">
          Form Reservasi
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <input type="hidden" name="user_id" value={data.user_id} />
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Tanggal Reservasi
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={data.date}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="meja_id"
                className="block text-sm font-medium text-gray-700"
              >
                Meja
              </label>
              <select
                id="meja_id"
                name="meja_id"
                value={data.meja_id}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="">Pilih Meja</option>
                {mejas.map((meja) => (
                  <option key={meja.id} value={meja.id}>
                    {meja.no_meja}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700"
              >
                Jumlah Tamu
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={data.guests}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={data.notes}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              ></textarea>
            </div>
            <div className="mt-6 flex justify-between">
              <Link
                href="/beranda"
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Kirim Reservasi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
