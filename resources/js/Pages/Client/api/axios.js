import axios from "axios";

// Ambil token CSRF dari meta tag di file HTML
const csrfToken = document.head.querySelector('meta[name="csrf-token"]');

if (csrfToken) {
    axios.defaults.headers.common['XSRF-TOKEN'] = csrfToken.content;
}

export default axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
});
