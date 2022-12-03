import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Logo from "../../components/Icons/Logo";
import Footer from "../../components/Footer";
import { EMAIL } from "../../utils/regex";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendEmail = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_API}/auth/forgot-password`,
        {
          email,
        }
      );

      const statusCode = response.status;

      if (statusCode !== 200) {
        setIsSent(false);
        setIsError(true);
      }
      setIsSent(true);
      setIsError(false);
      setIsSubmitting(false);
    } catch (error) {
      if (error) {
        setIsError(true);
        setIsSubmitting(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendEmail();
  };

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
        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
          {isSent ? (
            <div>
              <img
                src="https://res.cloudinary.com/dmgrxm78p/image/upload/v1670025142/terbangtinggi/email_sent_image.webp"
                alt="email sent successfully"
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
              <form
                className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="emailAddress"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="emailAddress"
                    className={`w-full input ${
                      isError ? "input-error" : "input-primary"
                    }`}
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {!isError ? null : (
                    <small className="text-error">Something wrong</small>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn bg-purple-primary w-full hover:bg-purple-primary-darker"
                  onClick={handleSubmit}
                  disabled={!email || !EMAIL.test(email) || isSubmitting}
                >
                  {isSubmitting ? "Submitting" : "Send Email"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
}
