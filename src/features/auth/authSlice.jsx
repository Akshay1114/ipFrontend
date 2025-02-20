// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: sessionStorage.getItem("token") || null, // Load from session storage
  user: null, // Store user details if needed
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("Login Success ==>>>>>>>>:", action.payload);
      state.token = action.payload;
      sessionStorage.setItem("token", action.payload.token); // Persist token
    },
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem("token"); // Clear token on logout
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
