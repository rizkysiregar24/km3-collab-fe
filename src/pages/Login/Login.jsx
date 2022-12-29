import React, { useEffect, useState } from 'react';
import { MdFlightTakeoff } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import useValidUser from '../../hooks/useValidUser';
import { login } from '../../redux/user/user.actions';
import Googlelogin from './Googlelogin';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(FaEyeSlash);

  const { error: isError } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isValidUser = useValidUser();

  const handleLogin = () => {
    dispatch(
      login({ email, password }, (status, role) => {
        if (status === 200 && role === 'admin') {
          navigate('/admin-page');
          toast('Succsessfully logged in as admin', {
            type: 'success'
          });
        } else if (status === 200) {
          navigate('/');
          toast('Succsessfully logged in', {
            type: 'success'
          });
        }
      })
    );
  };

  const handleToogle = () => {
    if (type === 'password') {
      setIcon(FaEye);
      setType('text');
    } else {
      setIcon(FaEyeSlash);
      setType('password');
    }
  };

  useEffect(() => {
    if (isValidUser) {
      navigate('/');
    }
  }, []);

  return (
    <div className="flex h-screen ">
      <div className=" w-6/12 mx-5 my-28 lg:px-44">
        <Link to="/">
          <h1 className="font-bold text-2xl">Login </h1>
        </Link>
        <h2 className="text-sm mt-5 ">Welcome back! Please enter your details</h2>
        <form className="flex flex-col w-80 sm:items-left">
          <div className=" mt-5 ">Email</div>
          <input
            type="email"
            name="email"
            id="email"
            className={`border focus:outline-0 rounded-md px-9 h-10 placeholder:text-sm ${
              isError ? 'input-error' : 'input border-[#7E56DA]'
            }`}
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className=" mt-5 ">Password</div>
          <div className=" flex flex-wrap">
            <input
              type={type}
              name="password"
              id="password"
              className={`w-full h-10 border focus:outline-0 px-9 rounded-md placeholder:text-sm ${
                isError ? 'input-error' : 'input border-[#7E56DA] '
              }`}
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="absolute my-3 ml-72  " type="button" onClick={handleToogle}>
              {icon}
            </button>
          </div>
          {isError ? <small>{isError}</small> : null}

          <button
            className=" text-xs ml-auto mt-2 text-[#7E56DA]  "
            type="button"
            onClick={() => navigate('/forgot-password')}>
            Forgot Password
          </button>

          <button
            className="bg-[#7E56DA] rounded-md mt-5 text-white text-sm h-8 disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            disabled={!email || !password}>
            Sign in
          </button>
          <GoogleOAuthProvider clientId="134468154099-apc6un8gp22f8dadi8tf1kf4o2fv2lnk.apps.googleusercontent.com">
            <Googlelogin />
          </GoogleOAuthProvider>

          <div className=" text-sm text-center mt-5">
            Don&apos;t have an account?{' '}
            <Link to="/Register">
              <button className=" text-sm ml-2 mt-2 text-[#7E56DA]" type="button">
                Sign up
              </button>{' '}
            </Link>
          </div>
        </form>
      </div>
      <div className=" sm:block hidden w-9/12 rounded-r-2xl bg-gray-100 p-28 px-28 decoration-purple-500 font-bold text-purple-500 font-sans text-center italic ">
        {' '}
        <MdFlightTakeoff
          className="hover:cursor-pointer text-[#7E56DA] ml-28  mt-20"
          size={200}
          onClick={() => {
            navigate('/');
          }}
        />{' '}
        Terbang Tinggi App
      </div>
    </div>
  );
}
