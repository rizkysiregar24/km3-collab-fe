import React, { useEffect } from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

export function Layout({ children, title }) {
  useEffect(() => {
    document.title = title ?? 'Terbang Tinggi | Best Price for Flights';
  }, []);

  return (
    <main className="mx-auto">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
