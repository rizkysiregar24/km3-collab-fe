import { createSlice } from "@reduxjs/toolkit";

const userDataFromLocalStorage = JSON.parse(localStorage.getItem("user"));
const userToken = localStorage.getItem("token");

const initialState = {
  token: userToken || null,
  name: userDataFromLocalStorage?.username || null,
  email: userDataFromLocalStorage?.email || null,
  role: userDataFromLocalStorage?.role || null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    _login: (state, action) => {
      const { token, error } = action.payload;
      state.token = token || null;
      state.error = error || null;
    },
    _logout: (state) => {
      state.email = "";
      state.role = "";
      state.name = "";
      state.token = "";
    },
    whoami: (state, action) => {
      const { name, email, role } = action.payload;
      state.name = name;
      state.email = email;
      state.role = role;
    },
    setError: (state, action) => {
      const { error } = action.payload;
      state.error = error || null;
    },
  },
});

export const { _login, _logout, whoami, setError } = userSlice.actions;

export default userSlice.reducer;
