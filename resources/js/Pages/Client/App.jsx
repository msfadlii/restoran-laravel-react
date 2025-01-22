import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing page/landingPage";
import Login from "./components/auth/loginForm";
import Register from "./components/auth/signupForm";
import AccountBox from "./components/auth/index";
import Home from "./components/home/home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AccountBox />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
