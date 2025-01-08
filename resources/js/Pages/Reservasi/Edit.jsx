import { useEffect } from "react";
import { useForm, router, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

export default function EditReservation({ reservation, status, users, meja }) {
  const { data, setData, put, processing, errors } = useForm({
    user_id: reservation?.user_id || "",
    meja_id: reservation?.meja_id || "",
    jumlah_tamu: reservation?.jumlah_tamu || "",
    status_reservasi: reservation?.status_reservasi || "",
    tanggal_reservasi: reservation?.tanggal_reservasi || "",
  });

  useEffect(() => {
    if (reservation) {
      setData({
        user_id: reservation.user_id,
        meja_id: reservation.meja_id || "",
        jumlah_tamu: reservation.jumlah_tamu,
        status_reservasi: reservation.status_reservasi,
        tanggal_reservasi: reservation.tanggal_reservasi,
      });
    } else {
      console.log("Data reservasi belum tersedia");
    }
  }, [reservation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reservation || !reservation.id) {
      console.error("ID reservasi tidak tersedia.");
      return;
    }

    put(route("reservasi.update", reservation.id), {
      onSuccess: () => {
        router.get(route("reservasi.index"));
      },
    });
  };

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
            Edit Reservasi
          </h2>
        </div>
      }
    >
      <Head title="Edit Reservasi" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div>
                  <label
                    htmlFor="user_id"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Nama Customer - Username
                  </label>
                  <SelectInput
                    name="user_id"
                    value={data.user_id}
                    onChange={handleChange}
                    error={errors.user_id}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                  >
                    <option value="">Pilih Customer</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} - {user.username}
                      </option>
                    ))}
                  </SelectInput>
                </div>
                <div>
                  <label
                    htmlFor="meja_id"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Meja
                  </label>
                  <SelectInput
                    name="meja_id"
                    value={data.meja_id}
                    onChange={handleChange}
                    error={errors.meja_id}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                  >
                    <option value="">Pilih Meja</option>
                    {meja.map((meja) => (
                      <option key={meja.id} value={meja.id}>
                        {meja.no_meja} - {meja.status_meja.status}
                      </option>
                    ))}
                  </SelectInput>
                </div>
                <div>
                  <label
                    htmlFor="jumlah_tamu"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Jumlah Tamu
                  </label>
                  <TextInput
                    name="jumlah_tamu"
                    value={data.jumlah_tamu}
                    onChange={handleChange}
                    type="number"
                    error={errors.jumlah_tamu}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="status_reservasi"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Status Reservasi
                  </label>
                  <SelectInput
                    name="status_reservasi"
                    value={data.status_reservasi}
                    onChange={handleChange}
                    error={errors.status_reservasi}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                  >
                    <option value="">Pilih Status</option>
                    {status.map((st) => (
                      <option key={st.id} value={st.status}>
                        {st.status}
                      </option>
                    ))}
                  </SelectInput>
                </div>
                <div>
                  <label
                    htmlFor="tanggal_reservasi"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Tanggal Reservasi
                  </label>
                  <TextInput
                    name="tanggal_reservasi"
                    value={data.tanggal_reservasi}
                    onChange={handleChange}
                    type="date"
                    error={errors.tanggal_reservasi}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300"
                  />
                </div>
                <div className="mt-auto flex justify-end space-x-2">
                  <Link
                    href={route("reservasi.index")}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    className="py-2 px-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    disabled={processing}
                  >
                    {processing ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
