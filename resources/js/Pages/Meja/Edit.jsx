import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ meja, statuses }) {
  const { data, setData, put, processing, errors } = useForm({
    no_meja: meja.no_meja,
    status_meja_id: meja.status_meja_id,
  });

  const submit = (e) => {
    e.preventDefault();
    put(route("meja.update", meja.id));
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit Meja
        </h2>
      }
    >
      <Head title="Edit Meja" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form onSubmit={submit}>
                <div className="mb-4">
                  <label
                    htmlFor="no_meja"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Nomor Meja
                  </label>
                  <input
                    type="text"
                    id="no_meja"
                    value={data.no_meja}
                    onChange={(e) => setData("no_meja", e.target.value)}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 ${
                      errors.no_meja ? "border-red-500" : ""
                    }`}
                  />
                  {errors.no_meja && (
                    <p className="mt-2 text-sm text-red-600">{errors.no_meja}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="status_meja_id"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Status Meja
                  </label>
                  <select
                    id="status_meja_id"
                    value={data.status_meja_id}
                    onChange={(e) => setData("status_meja_id", e.target.value)}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 ${
                      errors.status_meja_id ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Pilih Status</option>
                    {statuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.status}
                      </option>
                    ))}
                  </select>
                  {errors.status_meja_id && (
                    <p className="mt-2 text-sm text-red-600">{errors.status_meja_id}</p>
                  )}
                </div>

                <div className="flex items-center justify-end">
                  <Link
                    href={route("meja.index")}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    disabled={processing}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Simpan
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
