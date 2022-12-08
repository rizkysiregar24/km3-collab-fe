import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Protected from "./components/Routes/Protected";

import Error from "./pages/Error";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import User from "./pages/User";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { SearchResult } from "./pages/SearchResult";
import { Notifications } from "./pages/Notifications";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/*" element={<Error />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user"
          element={
            <Protected>
              <User />
            </Protected>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/notifications" element={<Notifications />} />`
      </Routes>
    </Router>
  );
}

export default App;
