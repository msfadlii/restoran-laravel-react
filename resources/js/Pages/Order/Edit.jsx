import React, { useState } from "react";
import { router, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit({ order, menus, mejaList }) {
  const { data, setData, put } = useForm({
    status: order.status || "",
    meja_id: order.meja_id || "",
    menu_items: order.menu_items || [],
    total_price: order.total_price || 0,
  });

  const [selectedMenu, setSelectedMenu] = useState("");
  const [menuQuantity, setMenuQuantity] = useState(1);

  const addMenuItem = () => {
    if (data.menu_items.length >= 3) {
      alert("You can only add up to 3 items.");
      return;
    }

    const menu = menus.find((menu) => menu.id === parseInt(selectedMenu));

    if (menu) {
      const newMenuItem = {
        menu_id: menu.id,
        name: menu.nama,
        price: menu.harga,
        quantity: menuQuantity,
        total: menu.harga * menuQuantity,
      };

      setData("menu_items", [...data.menu_items, newMenuItem]);

      setSelectedMenu("");
      setMenuQuantity(1);
    }
  };

  const removeMenuItem = (index) => {
    const menuItems = [...data.menu_items];
    menuItems.splice(index, 1);

    setData("menu_items", menuItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const total = data.menu_items.reduce((sum, item) => sum + item.total, 0);

    await put(route("order.update", order.id), {
      status: data.status,
      meja_id: data.meja_id,
      menu_items: data.menu_items.map((item) => ({
        menu_id: item.menu_id,
        quantity: item.quantity,
        price: item.price,
      })),
      total_price: total,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center space-x-2">
          <Link
            href={route("order.index")}
            className="text-lg text-gray-600 hover:text-white-800 dark:text-gray-200"
          >
            ←
          </Link>
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Edit Order
          </h2>
        </div>
      }
    >
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="meja"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Pilih Meja
                  </label>
                  <select
                    id="meja"
                    value={data.meja_id}
                    onChange={(e) => setData("meja_id", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <option value="">Pilih Meja</option>
                    {mejaList.map((meja) => (
                      <option key={meja.id} value={meja.id}>
                        {meja.no_meja}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={data.status}
                    onChange={(e) => setData("status", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="menu"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Add Menu Item
                  </label>
                  <div className="flex items-center space-x-2">
                    <select
                      id="menu"
                      value={selectedMenu}
                      onChange={(e) => setSelectedMenu(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:text-gray-200"
                    >
                      <option value="">Pilih Menu</option>
                      {menus.map((menu) => (
                        <option key={menu.id} value={menu.id}>
                          {menu.nama} - Rp{menu.harga}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={menuQuantity}
                      onChange={(e) => setMenuQuantity(Number(e.target.value))}
                      className="mt-1 w-20 p-2 border-gray-300 rounded-md"
                      min="1"
                    />
                    <button
                      type="button"
                      onClick={addMenuItem}
                      className="px-4 py-2 bg-green-600 text-white rounded-md"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Added Items
                  </h3>
                  <ul className="mt-2">
                    {data.menu_items.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between mb-2 text text-white"
                      >
                        <span>
                          {item.name} - {item.quantity} x Rp{item.price} = Rp
                          {item.total}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeMenuItem(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Total Price: Rp
                    {data.menu_items.reduce((sum, item) => sum + item.total, 0)}
                  </label>
                </div>

                <div className="mt-auto flex justify-end space-x-2">
                  <Link
                    href={route("order.index")}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Update Order
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
