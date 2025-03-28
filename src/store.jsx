import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import authReducer from './features/auth/authSlice'
import employeeScheduleReducer from './features/api/escheduleSlice'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    auth: authReducer,
    employeeSchedule: employeeScheduleReducer,
  },
})