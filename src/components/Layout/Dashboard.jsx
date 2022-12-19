import React from "react";
import { RiTicket2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// import Navbar from "./Navbar";
import NavbarDashboard from "./NavbarDashboard";
// import Sidebar from "./Sidebar";

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
    <section>
      <NavbarDashboard />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4">{children}</div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay" />
          <ul className="menu p-4 w-60 bg-base-100 text-base-content border-r-2 border-t-2">
            <li className="border-b-4">
              <Link
                to="/user-page"
                className="flex items-center p-2 px-10 text-base font-normal rounded-lg hover:bg-slate-200"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li className="border-b-4">
              <Link
                to="/create-ticket"
                className="flex items-center p-2 px-10 text-base font-normal rounded-lg hover:bg-slate-200 "
              >
                <RiTicket2Line className="w-6 h-6 " />
                <span className="flex-1 ml-3 whitespace-nowrap ">
                  Create Ticket
                </span>
              </Link>
            </li>
            <li className="border-b-4">
              <Link
                to="/ticket"
                className="flex items-center p-2 px-10 text-base font-normal rounded-lg hover:bg-slate-200 "
              >
                <RiTicket2Line className="w-6 h-6 " />
                <span className="flex-1 ml-3 whitespace-nowrap ">
                  List Ticket
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
