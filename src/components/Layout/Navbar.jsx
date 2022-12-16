/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useValidUser from '../../hooks/useValidUser';
import { logout } from '../../redux/user/user.actions';
import Logo from '../Icons/Logo';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { name, role } = useSelector((state) => state.user);

  const isAdmin = role === 'Admin';

  const dispatch = useDispatch();
  const isValidUser = useValidUser();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white text-black shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            className="font-bold text-2xl hidden md:inline-flex items-center gap-2"
            to="/"
            title="Back to Home">
            <Logo size={36} />
            Terbang Tinggi
          </Link>
          <Link className="font-bold text-2xl md:hidden inline-flex items-center gap-2" to="/">
            <Logo />
          </Link>
          <div className="hidden md:block">
            {isValidUser ? (
              <AuthRightElementNavbar
                handleLogout={handleLogout}
                isAdmin={isAdmin}
                username={name}
              />
            ) : (
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/login"
                  className=" hover:bg-brand-darker-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium border-brand border-2">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="hover:bg-brand-darker-800  px-3 py-2 rounded-md text-sm font-medium bg-brand text-white border-brand border-solid border-2">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Show or hide hamburger button on mobile */}
          {isValidUser ? (
            <div className="md:hidden">
              <AuthRightElementNavbar
                handleLogout={handleLogout}
                isAdmin={isAdmin}
                username={name}
              />
            </div>
          ) : (
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-brand text-white hover:bg-brand-darker-800 inline-flex items-center justify-center p-2 rounded-md  hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
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
                    aria-hidden="true">
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
          )}
        </div>
      </div>

      {/* Mobile Menu Navbar */}
      {isValidUser ? null : (
        <div className={isOpen ? 'block' : 'hidden'}>
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/login"
                className="hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">
                Login
              </Link>

              <Link
                to="/register"
                className=" hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

export function AuthRightElementNavbar({ handleLogout, isAdmin, username }) {
  return (
    <div className="flex items-center gap-2">
      <Link to="/notifications">
        <button className="btn btn-ghost btn-circle" type="button" title="Notifications">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {/* if there is notification, display this span right below this comment */}
            <span className="badge badge-xs badge-primary indicator-item" />
          </div>
        </button>
      </Link>
      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          className="btn btn-outline btn-primary btn-sm btn-circle avatar placeholder"
          title="Profile Menu">
          {username ? <span>{username[0].toUpperCase()}</span> : <span>TT</span>}
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          {isAdmin ? (
            <li>
              <Link to="/admin-page">Dashboard</Link>
            </li>
          ) : null}
          <li>
            <Link to="/user">Profile</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
          <li>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
