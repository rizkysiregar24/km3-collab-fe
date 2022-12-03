import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import Logo from "../../components/Icons/Logo";
import Footer from "../../components/Footer";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const isPasswordMatch = password === passwordConfirmation;

  const handleResetPassword = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_AUTH_API}/auth/reset-password?token=${token}`,
        {
          newPassword: password,
          confirmPassword: passwordConfirmation,
        }
      );
      if (response.status === 200) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        setIsSubmitting(false);
      } else {
        setIsSuccess(false);
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleResetPassword();
  };

  useEffect(() => {
    if (token !== null) {
      if (token.length !== 116) {
        navigate("/");
      }
    }
    if (token === null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    document.title = "Forgot Password | Terbang Tinggi";
  }, []);

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <Link
          className="font-bold text-2xl inline-flex items-center gap-2 mb-8"
          to="/"
        >
          <Logo size={36} />
          Terbang Tinggi
        </Link>
        {isSuccess ? (
          <div>
            <img
              src="https://res.cloudinary.com/dmgrxm78p/image/upload/v1670025245/terbangtinggi/password_is_reset.gif"
              alt="password is reset"
            />
            <p className="text-center my-4 text-2xl font-semibold">
              Password is changed. Redirecting to login page...
            </p>
          </div>
        ) : (
          <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Change Password
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="input input-primary w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="input input-primary w-full"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn bg-purple-primary w-full hover:bg-purple-primary-darker"
                onClick={handleSubmit}
                disabled={
                  !password ||
                  !passwordConfirmation ||
                  !isPasswordMatch ||
                  isSubmitting
                }
              >
                {isSubmitting ? "Resetting" : "Reset password"}
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
}
