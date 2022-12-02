import { MdFlightTakeoff } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(FaEyeSlash);
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post(`${process.env.REACT_APP_AUTH_API}/auth/login`, {
        email: email,
        password: password,
      })
      .then((resp) => {
        if (resp.data.data.token) {
          localStorage.setItem("token", resp.data.data.token);
          console.log(resp.data);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
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
    <>
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
                className=" focus:outline-0 border rounded-md px-9 placeholder:text-sm"
                placeholder="Enter your Email"
                onChange={function (e) {
                  setEmail(e.target.value);
                }}
              />

              <div className=" mt-5 ">Password</div>
              <div className=" flex flex-wrap">
                <input
                  type={type}
                  className=" w-full focus:outline-0 border px-9 rounded-md placeholder:text-sm"
                  placeholder="Enter your Password"
                  onChange={function (e) {
                    setPassword(e.target.value);
                  }}
                />

                <div className="absolute my-3 ml-72  " onClick={handleToogle}>
                  {icon}
                </div>
              </div>

              <button className=" text-xs ml-auto mt-2 text-[#7E56DA] ">
                {" "}
                Forgot Password{" "}
              </button>

              <button
                className="bg-[#7E56DA] rounded-md mt-5 text-white text-sm h-7"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                Sign in
              </button>

              <button className=" hover:bg-[#7E56DA] hover:text-white rounded-md text-sm flex mt-5 border-[#7E56DA] border-solid border-2 h-7">
                <svg
                  class="mr-3 ml-20 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="23px"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Sign in With Goggle
              </button>
              <div className=" text-sm text-center mt-5">
                Don't have an account?{" "}
                <Link to="/Register">
                  <button className=" text-sm ml-2 mt-2 text-[#7E56DA]">
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
    </>
  );
}
