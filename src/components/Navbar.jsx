import React, { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "./Icons/Logo";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-black shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            className="font-bold text-2xl hidden md:inline-flex items-center gap-2"
            to="/"
          >
            <Logo size={36} />
            Terbang Tinggi
          </Link>
          <Link className="font-bold text-2xl md:hidden inline-flex items-center gap-2">
            <Logo />
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/login"
                className=" hover:bg-brand-hover hover:text-white px-3 py-2 rounded-md text-sm font-medium border-brand border-solid border-2"
              >
                Login
              </Link>

              <Link
                to="/register"
                className=" hover:bg-brand-hover px-3 py-2 rounded-md text-sm font-medium bg-brand text-white border-brand border-solid border-2"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-brand text-white hover:bg-brand-hover inline-flex items-center justify-center p-2 rounded-md  hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-hover focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={isOpen ? "block" : "hidden"}>
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/register"
              className="hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </Link>

            <Link
              to="/login"
              className=" hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
