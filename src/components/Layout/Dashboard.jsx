import React from 'react';
import { RiTicket2Line } from 'react-icons/ri';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import useValidUser from '../../hooks/useValidUser';
import NavbarDashboard from './NavbarDashboard';
import Protected from '../Routes/Protected';

export function Dashboard({ children }) {
  const { role } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const isAdmin = role === 'Admin';

  const isValidUser = useValidUser();

  if (!isAdmin && !isValidUser) {
    navigate('/');
  }

  return (
    <Protected access="Admin">
      <section>
        <NavbarDashboard />
        <div className="drawer drawer-mobile z-0">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle z-0" />
          <div className="drawer-content p-4">{children}</div>
          <div className="drawer-side lg:z-0 drop-shadow-xl">
            <label htmlFor="my-drawer-4" className="drawer-overlay z-0 drop-shadow-xl" />
            <ul className="menu p-4 w-60 bg-base-100 text-base-content border-r-2 border-t-2 ">
              <li className="py-2">
                <Link
                  to="/user-page"
                  className="flex items-center p-2 px-10 text-base font-normal rounded-lg hover:bg-slate-300 hover:drop-shadow-xl">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                </Link>
              </li>
              <li className="py-2">
                <Link
                  to="/create-ticket"
                  className="flex items-center p-2 px-10 text-base font-normal rounded-lg hover:bg-slate-300 hover:drop-shadow-xl ">
                  <RiTicket2Line className="w-6 h-6 " />
                  <span className="flex-1 ml-3 whitespace-nowrap ">Create Flight</span>
                </Link>
              </li>
              <li className="py-2">
                <Link
                  to="/ticket"
                  className="flex items-center p-2 px-10 text-base font-normal rounded-lg hover:bg-slate-300 hover:drop-shadow-xl ">
                  <HiOutlineClipboardDocumentList className="w-6 h-6 " />
                  <span className="flex-1 ml-3 whitespace-nowrap ">List Flights</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Protected>
  );
}
