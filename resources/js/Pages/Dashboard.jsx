import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

import { 
    PieChart, 
    Pie, 
    Tooltip, 
    Cell, 
    ResponsiveContainer, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Legend 
} from 'recharts';  // Ensure 'Cell' is also imported here

export default function Dashboard() {
    // Ambil data dari props Inertia
    const { transactions, popularMenus } = usePage().props;

    // Cek data yang diterima di frontend
    useEffect(() => {
        console.log('Data Transaksi per Bulan:', transactions);
        console.log('Menu Paling Laris:', popularMenus);
    }, [transactions, popularMenus]);

    // Periksa apakah data transaksi valid sebelum di-mapping
    const transactionData = Array.isArray(transactions) ? transactions.map(item => ({
        name: item.month,
        value: item.total
    })) : [];

    // Periksa apakah data menu populer valid sebelum di-mapping
    const popularMenuData = Array.isArray(popularMenus) ? popularMenus.map(item => ({
        name: item.name,
        value: item.sold
    })) : [];

    // Warna untuk Bar Chart
    const transactionColor = '#4caf50';  // Hijau untuk transaksi

    // Warna untuk Pie Chart (Menu Paling Laris)
    const menuColors = ['#f44336', '#2196f3', '#ff9800', '#4caf50', '#9c27b0'];  // Adjust colors here

    // Custom Legend content
    const renderCustomLegend = (props) => {
        const { payload } = props;
        return (
            <div className="flex flex-col ml-5">
                {payload.map((entry, index) => (
                   <div key={`legend-item-${index}`} className="flex items-center mb-2">
                       <div className="w-4 h-4" style={{ backgroundColor: entry.color }}></div>
                        <span className="ml-2 text-sm font-medium">
                            {entry.value}: {entry.payload.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Grafik Transaksi - Bar Chart */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="mb-4 text-xl font-semibold">Grafik Transaksi</h3>
                            {transactionData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={400}> {/* Tinggi BarChart diperbesar */}
                                    <BarChart data={transactionData} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis
                                            domain={['auto', Math.ceil(Math.max(...transactionData.map(item => item.value)) / 50000)]}  // Add 50,000 to the max value
                                            ticks={
                                                transactionData.length > 0
                                                    ? Array.from(
                                                        { length: Math.floor((Math.max(...transactionData.map(item => item.value)) + 50000) / 50000)  },
                                                        (_, i) => i * 50000
                                                    )
                                                    : []
                                            }  // Set interval ke 50.000
                                        />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" fill={transactionColor} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <p>No transaction data available.</p>
                            )}
                        </div>
                    </div>


                    {/* Grafik Menu Paling Laris - Pie Chart */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="mb-4 text-lg font-semibold">Menu Paling Laris</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie 
                                        data={popularMenuData} 
                                        dataKey="value" 
                                        nameKey="name" 
                                        outerRadius={80} 
                                        innerRadius={50}
                                    >
                                        {popularMenuData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={menuColors[index % menuColors.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend content={renderCustomLegend} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
