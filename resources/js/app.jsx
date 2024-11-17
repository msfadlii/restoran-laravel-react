import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify'; // Impor ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Impor CSS untuk Toastify

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Render App dan tambahkan ToastContainer di sini
        root.render(
            <>
                <App {...props} />
                <ToastContainer /> {/* Menambahkan ToastContainer di luar App */}
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
