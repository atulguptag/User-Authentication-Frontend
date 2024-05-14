import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./components/mainpage/Mainpage";
import Login from "./components/login-page/Login";
import Signup from "./components/signup-page/Signup";
import ForgotPasswordPage from "./components/forgotpass-page/ForgotPasswordPage.jsx";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Ticket from "./components/ticket-page/Ticket";

export default function App() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot_password" element={<ForgotPasswordPage />} />
            <Route path="/tickets" element={<Ticket />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
