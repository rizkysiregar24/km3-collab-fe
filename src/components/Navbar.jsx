import React, { useState } from "react";
import { Link } from "react-router-dom"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-black shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="font-bold text-2xl hidden md:inline-flex items-center gap-2">
            <PlaneIcon />
            Terbang Tinggi
          </h1>
          <h1 className="font-bold text-2xl md:hidden inline-flex items-center gap-2">
            <PlaneIcon />
            TT
          </h1>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/Login">
                <button
                  className=" hover:bg-[#7E56DA] hover:text-white px-3 py-2 rounded-md text-sm font-medium border-[#7E56DA] border-solid border-2"
                >
                  Login
                </button>
              </Link >

              <Link to="/Register">
                <button
                  
                  className=" hover:bg-[#7348da] px-3 py-2 rounded-md text-sm font-medium bg-[#7E56DA] text-white border-[#7E56DA] border-solid border-2"
                >
                  Register
                </button>
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-[#7E56DA] text-white hover:bg-[#7348da] inline-flex items-center justify-center p-2 rounded-md  hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#7E56DA] focus:ring-white"
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
            <a
              href="#xx"
              className="hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </a>

            <a
              href="#ss"
              className=" hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
            >
              Team
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

function PlaneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="bi bi-airplane-fill rotate-45"
      viewBox="0 0 16 16"
    >
      <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z" />
    </svg>
  );
}
