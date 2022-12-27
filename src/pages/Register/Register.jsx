import React, { useEffect, useState } from 'react';
import { MdFlightLand } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import useValidUser from '../../hooks/useValidUser';
import { registerUser } from '../../redux/user/user.actions';

export function Register() {
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isValidUser = useValidUser();

  const handleToogle = () => {
    setPasswordEye(!passwordEye);
  };
  const handleConfirmToogle = () => {
    setConfirmPasswordEye(!confirmPasswordEye);
  };

  useEffect(() => {
    if (isValidUser) {
      navigate('/');
    }
  }, []);

  const handleRegister = (data) => {
    dispatch(
      registerUser(data, (status) => {
        if (status === 201 || status === 200) {
          toast('Register success, check your email');
          navigate('/login');
        }
      })
    );
  };

  return (
    <section className="bg-gray-400 min-h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-2xl shadow-lg  px-0 ">
        <div className=" sm:w-9/12 p-20 rounded-2xl">
          <Link to="/">
            <h1 className="font-bold text-2xl">Register</h1>
          </Link>

          <p className="text-sm mt-5  ">Get Started! Please enter your details</p>

          <form className="flex flex-col w-80" onSubmit={handleSubmit(handleRegister)}>
            <div className=" mt-5 ">Username</div>
            <input
              type="text"
              className={`focus:outline-0 border border-[#7E56DA] px-9 rounded-md pl-5 h-10 placeholder:text-sm ${
                errors.username && 'border-error'
              }`}
              placeholder="Enter your Username"
              {...register('username', { required: true })}
            />
            {errors.username && <small className="text-error">Username is required</small>}

            <div className=" mt-3 ">Email</div>
            <input
              type="email"
              className={`focus:outline-0 border  border-[#7E56DA] px-9 rounded-md h-10 pl-5 placeholder:text-sm ${
                errors.email && 'border-error'
              }`}
              placeholder="Enter your Email"
              {...register('email', { required: true })}
            />
            {errors.email && <small className="text-error">Email is required</small>}

            <div className=" mt-3 ">Password</div>
            <div className="flex">
              <input
                className={`w-full focus:outline-0 border px-9 border-[#7E56DA] h-10 pl-5 rounded-md placeholder:text-sm ${
                  errors.password && 'border-error'
                }`}
                type={passwordEye === false ? 'password' : 'text'}
                placeholder="Enter your Password"
                {...register('password', { required: true })}
              />
              <span className="absolute ml-72 my-3">
                {passwordEye === false ? (
                  <FaEyeSlash onClick={handleToogle} />
                ) : (
                  <FaEye onClick={handleToogle} />
                )}
              </span>
            </div>
            {errors.password && <small className="text-error">Password is required</small>}

            <div className=" mt-3">Password Confirmation</div>
            <div className="flex">
              <input
                className={`w-full focus:outline-0 border border-[#7E56DA] px-9 pl-5 rounded-md h-10 placeholder:text-sm ${
                  errors.confirmPassword && 'border-error'
                }`}
                type={confirmPasswordEye === false ? 'password' : 'text'}
                {...register('confirmPassword', { required: true })}
                placeholder="Enter your Password Confirmation"
              />
              <span className="absolute ml-72 my-3">
                {confirmPasswordEye === false ? (
                  <FaEyeSlash onClick={handleConfirmToogle} />
                ) : (
                  <FaEye onClick={handleConfirmToogle} />
                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <small className="text-error">Confirm password is required</small>
            )}

            <button
              className="bg-[#7E56DA] rounded-md mt-5 text-white text-sm h-8 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
              disabled={isSubmitting}
              type="submit">
              {isSubmitting ? 'Registering' : 'Register'}
            </button>

            <div className=" text-sm text-center mt-3">
              Already Have An Account?{' '}
              <Link to="/Login">
                <button className=" text-xs ml-2 mt-2 text-[#7E56DA]" type="button">
                  {' '}
                  Sign In
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className=" sm:block hidden w-9/12 rounded-r-2xl bg-gray-100 p-28 px-28 decoration-purple-500 font-bold text-purple-500 font-sans text-center italic ">
          {' '}
          <MdFlightLand
            className="hover:cursor-pointer text-[#7E56DA]  mt-20"
            size={200}
            onClick={() => {
              navigate('/');
            }}
          />{' '}
          Terbang Tinggi App
        </div>
      </div>
    </section>
  );
}
