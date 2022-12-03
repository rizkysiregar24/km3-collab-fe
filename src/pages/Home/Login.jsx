import { MdFlightTakeoff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Googlelogin from "./Googlelogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(FaEyeSlash);
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post(`${process.env.REACT_APP_AUTH_API}/auth/login`, {
        email,
        password,
      })
      .then((resp) => {
        if (resp.data.data.token) {
          localStorage.setItem("token", resp.data.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
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
          <h1 className="font-bold text-2xl">Login</h1>
          <p className="text-sm mt-5  ">
            Welcome back! Please enter your details
          </p>

          <form className="flex flex-col w-80 ">
            <div className=" mt-5 ">Email</div>
            <input
              type="email"
              className=" focus:outline-0 border rounded-md border-[#7E56DA] px-9 h-10 placeholder:text-sm"
              placeholder="Enter your Email"
              onChange={function (e) {
                setEmail(e.target.value);
              }}
            />

            <div className=" mt-5 ">Password</div>
            <div className=" flex flex-wrap">
              <input
                type={type}
                className=" w-full focus:outline-0 border border-[#7E56DA] h-10 px-9 rounded-md placeholder:text-sm"
                placeholder="Enter your Password"
                onChange={function (e) {
                  setPassword(e.target.value);
                }}
              />

              <button
                className="absolute my-3 ml-72  "
                type="button"
                onClick={handleToogle}
              >
                {icon}
              </button>
            </div>

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
              className="bg-[#7E56DA] rounded-md mt-5 text-white text-sm h-8"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
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
