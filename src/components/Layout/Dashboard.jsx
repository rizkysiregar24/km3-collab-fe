import React from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export function Dashboard({ children }) {
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
