import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import { Home } from "./pages/Home";
import Login from "./pages/Home/Login";
import Register from "./pages/Home/Register";
import User from "./pages/User";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import Verifiedemail from "./pages/Authentication/Verifiedemail";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/*" element={<Error />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verified-email" element={<Verifiedemail />} />
      </Routes>
    </Router>
  );
}

export default App;
