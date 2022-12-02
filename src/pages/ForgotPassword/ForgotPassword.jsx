import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Logo from "../../components/Icons/Logo";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSendEmail = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_AUTH_API}/auth/forgot-password`,
      {
        email,
      }
    );
    if (response.status === 200) {
      setIsSent(true);
    } else {
      setIsSent(false);
    }
  };

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          className="font-bold text-2xl hidden md:inline-flex items-center gap-2 mb-8"
          to="/"
        >
          <Logo size={36} />
          Terbang Tinggi
        </Link>
        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
          {isSent ? (
            <div>
              <img
                src="https://media3.giphy.com/media/ah7KwjMNJlhtK/giphy.gif?cid=ecf05e47ot9zobs958fixs1o1sc6hqu6lcll8ilwe55dnqcz&rid=giphy.gif&ct=g"
                alt="email"
              />
              <p className="text-center mt-4 text-2xl font-semibold">
                Email sent, check your inbox
              </p>
              <Link to="/">
                <button
                  type="button"
                  className="btn bg-purple-primary w-full hover:bg-purple-primary-darker mt-4"
                >
                  Go to Home
                </button>
              </Link>
            </div>
          ) : (
            <>
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Forgot Your Password?
              </h2>
              <p className="mt-4 text-gray-600">
                Don&apos;t fret! Just type in your email and we will send you a
                code to reset your password!
              </p>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input input-primary w-full"
                    placeholder="jhondoe@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn bg-purple-primary w-full hover:bg-purple-primary-darker"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendEmail();
                  }}
                  disabled={!email}
                >
                  Send Email
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
