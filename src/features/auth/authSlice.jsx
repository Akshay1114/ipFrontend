// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: sessionStorage.getItem("token") || null, // Load from session storage
  user: null,
  role: sessionStorage.getItem("role") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("Login Success ==>>>>>>>>:", action.payload);
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.role = action.payload.user.role;
      sessionStorage.setItem("role", action.payload.user.role);
      sessionStorage.setItem("token", action.payload.token); 
    },
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem("token"); 
      sessionStorage.removeItem("role");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
