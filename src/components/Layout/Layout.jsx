import React, { useEffect } from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

export function Layout({ children, title, className }) {
  useEffect(() => {
    document.title =
      `${title} | Best Price for Flights` ?? 'Terbang Tinggi | Best Price for Flights';
  }, []);

  return (
    <main className={`mx-auto ${className}`}>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
