import { createSlice } from '@reduxjs/toolkit';

const userDataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
const userToken = localStorage.getItem('token');

const initialState = {
  token: userToken || '',
  id: userDataFromLocalStorage?.id || '',
  name: userDataFromLocalStorage?.username || '',
  email: userDataFromLocalStorage?.email || '',
  role: userDataFromLocalStorage?.role || '',
  error: '',
  currentTicket: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    _login: (state, action) => {
      const { token, error, id } = action.payload;
      state.token = token;
      state.error = error;
      state.id = id;
    },
    _register: (state, action) => {
      const { email } = action.payload;
      state.email = email;
    },
    _logout: (state) => {
      state.email = '';
      state.role = '';
      state.name = '';
      state.token = '';
    },
    whoami: (state, action) => {
      const { name, email, role } = action.payload;
      state.name = name;
      state.email = email;
      state.role = role;
    },
    setError: (state, action) => {
      const { error } = action.payload;
      state.error = error;
    },

    _setCurrentTicket: (state, action) => {
      state.currentTicket = action.payload;
    }
  }
});

export const { _login, _register, _logout, whoami, setError, _setCurrentTicket } =
  userSlice.actions;

export default userSlice.reducer;
