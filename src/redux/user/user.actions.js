import axios from 'axios';
import { toast } from 'react-toastify';

import {
  _login,
  _register,
  _logout,
  whoami,
  setError,
  _myprofile,
  _setCurrentTicket
} from './user.slice';

const API_URL = process.env.REACT_APP_AUTH_API;
const token = localStorage.getItem('token');

export const login =
  ({ email, password }, callback) =>
  async (dispatch) => {
    try {
      const { data, status } = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      dispatch(_login({ token: data.data.token, id: data.data.id }));

      if (status === 200) {
        localStorage.setItem('token', data.data.token);
      }

      const { data: verifiedToken, status: verifiedStatus } = await axios.get(
        `${API_URL}/auth/me`,
        {
          headers: {
            Authorization: data.data.token
          }
        }
      );

      if (verifiedStatus === 200) {
        dispatch(
          whoami({
            name: verifiedToken.data.username,
            email: verifiedToken.data.email,
            role: verifiedToken.data.role
          })
        );
        localStorage.setItem('user', JSON.stringify(verifiedToken.data));
        callback(verifiedStatus);
      }
    } catch (error) {
      setError({ error: error.response.data.message });
      toast(JSON.stringify(error.response.data.message), { type: 'error' });
    }
    return null;
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(_logout());
};

export const loginGoogle = (accessToken, callback, data) => async (dispatch) => {
  try {
    const { data: tokenData } = await axios.post(`${API_URL}/auth/google`, {
      access_token: accessToken
    });

    // check token with whoami

    // save to localstorage and redux (token, userData)
    localStorage.setItem('token', tokenData.token);
    dispatch(_login(tokenData));
    const { data: verifiedToken, status: verifiedStatus } = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: data.data.token
      }
    });

    if (verifiedStatus === 200) {
      dispatch(
        whoami({
          name: verifiedToken.data.username,
          email: verifiedToken.data.email,
          role: verifiedToken.data.role
        })
      );
      localStorage.setItem('user', JSON.stringify(verifiedToken.data));
      callback(verifiedStatus);
    }
  } catch (error) {
    toast(JSON.stringify(error.response.data.message), { type: 'error' });
  }
  return null;
};

export const register =
  ({ email, password, confirmPassword, username }, callback) =>
  async (dispatch) => {
    try {
      const { data: registerData, status: registerStatus } = await axios.post(
        `${API_URL}/auth/register`,
        {
          email,
          password,
          confirmPassword,
          username
        }
      );
      if (registerStatus === 201 || registerStatus === 200) {
        dispatch(_register({ email: registerData.data.email }));
        callback(registerStatus);
      }
    } catch (error) {
      toast(JSON.stringify(error.response.data.message), { type: 'error' });
    }
    return null;
  };

export const myProfile = () => async (dispatch) => {
  try {
    const { data: tokenData } = await axios.get(`${API_URL}/user/myProfile`, {
      headers: {
        Authorization: token
      }
    });

    dispatch(
      _myprofile({
        name: tokenData.data.username,
        email: tokenData.data.email,
        thumbnail: tokenData.data.thumbnail,
        fullName: tokenData.data.fullName,
        gender: tokenData.data.gender,
        country: tokenData.data.country,
        province: tokenData.data.province,
        city: tokenData.data.city,
        address: tokenData.data.address,
        phone: tokenData.data.phone
      })
    );
  } catch (error) {
    toast(JSON.stringify(error.response.data.message), { type: 'error' });
  }
  return null;
};
export const setCurrentTicket = (ticketDetail) => (dispatch) => {
  dispatch(_setCurrentTicket(ticketDetail));
};
