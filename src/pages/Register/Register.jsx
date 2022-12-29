import React, { useEffect, useState } from 'react';
import { MdFlightLand } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import useValidUser from '../../hooks/useValidUser';
import { setError } from '../../redux/user/user.slice';
import { register } from '../../redux/user/user.actions';

export function Register() {
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const { error } = useSelector((state) => state.user);

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

  const handleRegister = () => {
    if (confirmPassword === password) {
      dispatch(
        register(
          {
            email,
            password,
            confirmPassword,
            username
          },
          (status) => {
            if (status === 201 || status === 200) {
              toast('Register success, check your email');
              navigate('/login');
            }
          }
        )
      );
    } else {
      dispatch(setError({ error: 'Password tidak sama' }));
    }
  };

  return (
    <div className="flex h-screen  ">
      <div className=" w-6/12 mx-5 my-28 lg:px-44">
        <Link to="/">
          <h1 className="font-bold text-2xl">Register</h1>
        </Link>

        <p className="text-sm mt-5  ">Get Started! Please enter your details</p>

        <form className="flex flex-col w-80">
          <div className=" mt-5 ">Username</div>
          <input
            type="text"
            className=" focus:outline-0 border border-[#7E56DA] px-9 rounded-md pl-5 h-10 placeholder:text-sm"
            placeholder="Enter your Full Name"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <div className=" mt-3 ">Email</div>
          <input
            type="email"
            className=" focus:outline-0 border  border-[#7E56DA] px-9 rounded-md h-10 pl-5 placeholder:text-sm"
            placeholder="Enter your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <div className=" mt-3 ">Password</div>
          <div className="flex">
            <input
              className="  w-full focus:outline-0 border px-9 border-[#7E56DA] h-10 pl-5 rounded-md placeholder:text-sm"
              type={passwordEye === false ? 'password' : 'text'}
              placeholder="Enter your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span className="absolute ml-72 my-3">
              {passwordEye === false ? (
                <FaEyeSlash onClick={handleToogle} />
              ) : (
                <FaEye onClick={handleToogle} />
              )}
            </span>
          </div>

          <div className=" mt-3">Password Confirmation</div>
          <div className="flex">
            <input
              className=" w-full focus:outline-0 border border-[#7E56DA] px-9 pl-5 rounded-md h-10 placeholder:text-sm "
              type={confirmPasswordEye === false ? 'password' : 'text'}
              placeholder="Enter your Password Confirmation"
              onChange={(e) => {
                setconfirmPassword(e.target.value);
              }}
            />
            <span className="absolute ml-72 my-3">
              {confirmPasswordEye === false ? (
                <FaEyeSlash onClick={handleConfirmToogle} />
              ) : (
                <FaEye onClick={handleConfirmToogle} />
              )}
            </span>
          </div>
          {error ? <small>{error}</small> : null}
          <button
            className="bg-[#7E56DA] rounded-md mt-5 text-white text-sm h-8 disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            disabled={!username || !email || !password || !confirmPassword}>
            Sign up
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
          className="hover:cursor-pointer text-[#7E56DA] ml-28 mt-32"
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
