import React, { useState } from "react";
import { MdFlightTakeoff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { _login, whoami } from "../../redux/user/user.slice";
import Googlelogin from "./Googlelogin";

const API_URL = process.env.REACT_APP_AUTH_API;

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(FaEyeSlash);

  const { error: isError } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const responseLogin = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const dataLogin = await responseLogin.data;
      const statusLogin = await responseLogin.status;

      dispatch(_login({ token: dataLogin.data.token }));

      if (statusLogin === 200) {
        localStorage.setItem("token", dataLogin.data.token);
      }

      const authToken = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: dataLogin.data.token,
        },
      });

      const authResponse = await authToken.data;
      const authStatus = await authToken.status;

      if (authStatus === 200) {
        dispatch(
          whoami({
            name: authResponse.data.username,
            email: authResponse.data.email,
            role: authResponse.data.role,
          })
        );
        localStorage.setItem("user", JSON.stringify(authResponse.data));
        navigate("/");
      }
    } catch (error) {
      dispatch(
        _login({
          error: error.response.data.message,
          token: null,
          name: null,
          email: null,
          role: null,
        })
      );
    }
  };

  const handleToogle = () => {
    if (type === "password") {
      setIcon(FaEye);
      setType("text");
    } else {
      setIcon(FaEyeSlash);
      setType("password");
    }
  };

  return (
    <section className="bg-gray-400 min-h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-2xl shadow-lg  px-0 ">
        <div className=" sm:w-9/12 p-28 rounded-2xl">
          <Link to="/">
            <h1 className="font-bold text-2xl">Login</h1>
          </Link>

          <p className="text-sm mt-5  ">
            Welcome back! Please enter your details
          </p>

          <form className="flex flex-col w-80 ">
            <div className=" mt-5 ">Email</div>
            <input
              type="email"
              className={`border focus:outline-0 rounded-md px-9 h-10 placeholder:text-sm ${
                isError ? "input-error" : "input border-[#7E56DA]"
              }`}
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className=" mt-5 ">Password</div>
            <div className=" flex flex-wrap">
              <input
                type={type}
                className={`w-full h-10 border focus:outline-0 px-9 rounded-md placeholder:text-sm ${
                  isError ? "input-error" : "input border-[#7E56DA] "
                }`}
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute my-3 ml-72  "
                type="button"
                onClick={handleToogle}
              >
                {icon}
              </button>
            </div>
            {isError ? <small>{isError}</small> : null}

            <button
              className=" text-xs ml-auto mt-2 text-[#7E56DA]  "
              type="button"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>

            <button
              className="bg-[#7E56DA] rounded-md mt-5 text-white text-sm h-8 disabled:bg-gray-400 disabled:cursor-not-allowed"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              disabled={!email || !password}
            >
              Sign in
            </button>
            <GoogleOAuthProvider clientId="134468154099-apc6un8gp22f8dadi8tf1kf4o2fv2lnk.apps.googleusercontent.com">
              <Googlelogin />
            </GoogleOAuthProvider>

            <div className=" text-sm text-center mt-5">
              Don&apos;t have an account?{" "}
              <Link to="/Register">
                <button
                  className=" text-sm ml-2 mt-2 text-[#7E56DA]"
                  type="button"
                >
                  Sign up
                </button>{" "}
              </Link>
            </div>
          </form>
        </div>
        <div className=" sm:block hidden w-9/12 rounded-r-2xl bg-gray-100 p-28 px-28 decoration-purple-500 font-bold text-purple-500 font-sans text-center italic ">
          {" "}
          <MdFlightTakeoff
            className="text-[#7E56DA] hover:cursor-pointer  mt-20"
            size={200}
            onClick={() => {
              navigate("/");
            }}
          />{" "}
          Terbang Tinggi App
        </div>
      </div>
    </section>
  );
}
