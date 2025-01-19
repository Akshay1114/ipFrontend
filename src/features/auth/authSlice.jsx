import { createSlice } from "@reduxjs/toolkit";
// import { onAuthStateChanged } from 'firebase/auth';



const initialState = {
    user: null,
    isAuthenticated: false,
  }

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login(state, action) {
        console.log("action", action)
        state.user = action.payload;
        state.isAuthenticated = true;
      },
      logout(state) {
        state.user = null;
        state.isAuthenticated = false;
      },
    },
  });
  
  export const { login, logout } = authSlice.actions;
  export default authSlice.reducer;