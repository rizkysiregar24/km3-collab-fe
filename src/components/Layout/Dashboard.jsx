import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export function Dashboard({ children }) {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userDataRedux = useSelector((state) => state.user);

  const navigate = useNavigate();

  const isAdmin = userDataRedux.role === "Admin";

  const isValidUser =
    Boolean(userData?.username) &&
    Boolean(userData?.email) &&
    Boolean(userData?.role) &&
    Boolean(userDataRedux?.name) &&
    Boolean(userDataRedux?.email) &&
    Boolean(userDataRedux?.role);

  if (!isAdmin && !isValidUser) {
    navigate("/");
  }

  return (
    <section className="flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        {children}
      </div>
    </section>
  );
}
