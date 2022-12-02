import { MdFlightLand } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleToogle = () => {
    setPasswordEye(!passwordEye);
  };
  const handleConfirmToogle = () => {
    setConfirmPasswordEye(!confirmPasswordEye);
  };

  const handleRegister = () => {
    if (username === "") {
      alert(" first Name is required");
      return;
    }

    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    if (confirmPassword === "") {
      alert("Password Confirmation is required");
      return;
    }

    if (confirmPassword === password) {
      axios
        .post(`${process.env.REACT_APP_AUTH_API}/auth/register`, {
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          username: username,
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.data) {
            localStorage.setItem("data", resp.data.data);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    } else {
      alert("Confirmation password tidak sama!");
    }
  };

  return (
    <>
      <section className="bg-gray-400 min-h-screen flex items-center justify-center">
        <div className="bg-white flex rounded-2xl shadow-lg  px-0 ">
          <div className=" sm:w-9/12   p-28 rounded-2xl">
            <h1 className="font-bold text-2xl">Register</h1>
            <p className="text-sm mt-5  ">
              Get Started! Please enter your details
            </p>

            <form className="flex flex-col w-80">
              <div className=" mt-5 ">Username</div>
              <input
                type="text"
                className=" focus:outline-0 border-1  border-gray px-9 rounded-md pl-5 placeholder:text-sm"
                placeholder="Enter your Full Name"
                onChange={function (e) {
                  setUsername(e.target.value);
                }}
              />
              <div className=" mt-5 ">Email</div>
              <input
                type="email"
                className=" focus:outline-0 border-1  border-gray px-9 rounded-md pl-5 placeholder:text-sm"
                placeholder="Enter your Email"
                onChange={function (e) {
                  setEmail(e.target.value);
                }}
              />

              <div className=" mt-5 ">Password</div>
              <div className="flex">
                <input
                  className="  w-full focus:outline-0 border-1 px-9 border-gray  pl-5 rounded-md placeholder:text-sm"
                  type={passwordEye === false ? "password" : "text"}
                  placeholder="Enter your Password"
                  onChange={function (e) {
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

              <div className=" mt-5 ">Password Confirmation</div>
              <div className="flex">
                <input
                  className=" w-full focus:outline-0 border-1 px-9 border-gray  pl-5 rounded-md placeholder:text-sm "
                  type={confirmPasswordEye === false ? "password" : "text"}
                  placeholder="Enter your Password Confirmation"
                  onChange={function (e) {
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

              <button className=" text-xs ml-auto mt-2 text-[#7E56DA]">
                {" "}
                Forgot Password{" "}
              </button>
              <button
                className="bg-[#7E56DA] rounded-md mt-5 text-white text-sm h-7"
                onClick={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
              >
                Sign up
              </button>
              <div className=" text-sm text-center mt-5">
                Already Have An Account?{" "}
                <Link to="/Login">
                  <button className=" text-xs ml-2 mt-2 text-[#7E56DA]">
                    {" "}
                    Sign In
                  </button>
                </Link>
              </div>
            </form>
          </div>
          <div className=" sm:block hidden w-9/12 rounded-r-2xl bg-gray-100 p-28 px-28 decoration-purple-500 font-bold text-purple-500 font-sans text-center italic ">
            {" "}
            <MdFlightLand
              className="hover:cursor-pointer text-[#7E56DA]  mt-20"
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
