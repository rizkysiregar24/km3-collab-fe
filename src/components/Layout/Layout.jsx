import React from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

export function Layout({ children }) {
  return (
    <main className="mx-auto">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
