import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import Button from '../../components/Input/Button';
import Logo from '../../components/Icons/Logo';
import Footer from '../../components/Layout/Footer';

export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  const isPasswordMatch = password === passwordConfirmation;

  const handleResetPassword = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_AUTH_API}/auth/reset-password?token=${token}`,
        {
          newPassword: password,
          confirmPassword: passwordConfirmation
        }
      );
      if (response.status === 200) {
        setIsError('');
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
        setIsSubmitting(false);
      } else {
        setIsError('Link is experied, request a link again from Forgot password page');
        setIsSuccess(false);
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsError('Link is experied, request a link again from Forgot password page');
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
    if (token === null) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    document.title = 'Forgot Password | Terbang Tinggi';
  }, []);

  return (
    <section className="bg-slate-100 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <Link className="font-bold text-2xl inline-flex items-center gap-2 mb-8" to="/">
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
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  New Password
                </label>
                <div className="relative mb-6">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={`input w-full ${isError ? 'input-error' : 'input-primary'}`}
                    value={password}
                    onChange={(e) => {
                      setIsError('');
                      setPassword(e.target.value);
                    }}
                    required
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    tabIndex={-1}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    title="Show password">
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className={`input w-full ${isError ? 'input-error' : 'input-primary'}`}
                  value={passwordConfirmation}
                  onChange={(e) => {
                    setIsError('');
                    setPasswordConfirmation(e.target.value);
                  }}
                  required
                />
                <small className="text-sm text-error mt-2">
                  {isPasswordMatch || !password || !passwordConfirmation
                    ? null
                    : 'Password do not match'}
                </small>
                {isError ? <small className="text-sm text-error mt-2">{isError}</small> : null}
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!password || !passwordConfirmation || !isPasswordMatch || isSubmitting}>
                {isSubmitting ? 'Resetting' : 'Reset password'}
              </Button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
}
