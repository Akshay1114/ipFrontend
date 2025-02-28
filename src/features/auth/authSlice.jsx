// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: sessionStorage.getItem("token") || null, // Load from session storage
  user: null,
  employee_ID:sessionStorage.getItem("employee_ID") || null,
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
      state.employee_ID = action.payload.user.employeeId;
      sessionStorage.setItem("role", action.payload.user.role);
      sessionStorage.setItem("token", action.payload.token); 
      sessionStorage.setItem("employee_ID", action.payload.user.employee_ID); 
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
