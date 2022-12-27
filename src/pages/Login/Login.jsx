import React, { useEffect, useState } from 'react';
import { MdFlightTakeoff } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import useValidUser from '../../hooks/useValidUser';
import { login } from '../../redux/user/user.actions';
import Googlelogin from './Googlelogin';

export function Login() {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(FaEyeSlash);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isValidUser = useValidUser();

  const handleLogin = (data) =>
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch(
          login(data, (status, role) => {
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
        resolve();
      }, 500);
    });

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
    <section className="bg-gray-400 min-h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-2xl shadow-lg  px-0 ">
        <div className=" sm:w-9/12 p-28 rounded-2xl">
          <Link to="/">
            <h1 className="font-bold text-2xl">Login</h1>
          </Link>

          <p className="text-sm mt-5  ">Welcome back! Please enter your details</p>

          <form className="flex flex-col w-80" onSubmit={handleSubmit(handleLogin)}>
            <div className=" mt-5 ">Email</div>
            <input
              type="email"
              className={`border focus:outline-0 rounded-md px-9 h-10 placeholder:text-sm ${
                errors.email ? 'input-error' : 'input border-[#7E56DA]'
              }`}
              placeholder="Enter your Email"
              {...register('email', { required: true })}
            />
            {errors.email && <small className="text-error">Email is required</small>}

            <div className=" mt-5 ">Password</div>
            <div className=" flex flex-wrap">
              <input
                type={type}
                className={`w-full h-10 border focus:outline-0 px-9 rounded-md placeholder:text-sm ${
                  errors.password ? 'input-error' : 'input border-[#7E56DA] '
                }`}
                placeholder="Enter your Password"
                {...register('password', { required: true })}
              />
              <button className="absolute my-3 ml-72  " type="button" onClick={handleToogle}>
                {icon}
              </button>
            </div>
            {errors.password && <small className="text-error">Password is required</small>}

            <button
              className=" text-xs ml-auto mt-2 text-[#7E56DA]  "
              type="button"
              onClick={() => navigate('/forgot-password')}>
              Forgot Password
            </button>

            <button
              className="bg-[#7E56DA] rounded-md mt-5 text-white text-sm h-8 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
              disabled={isSubmitting}
              type="submit">
              {isSubmitting ? 'Logging in' : 'Login'}
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
          <MdFlightTakeoff
            className="text-[#7E56DA] hover:cursor-pointer  mt-20"
            size={200}
            onClick={() => {
              navigate('/');
            }}
          />
          Terbang Tinggi App
        </div>
      </div>
    </section>
  );
}
