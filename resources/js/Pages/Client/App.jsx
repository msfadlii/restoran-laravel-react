import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing page/landingPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/home";
import BookTable from "./components/book_table/Index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/book-table" element={<BookTable />} /> */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
