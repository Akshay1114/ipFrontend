import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { wingWiseApi } from "../../utils/AxiosInstance";

// Async thunk to fetch API data
export const fetchData = createAsyncThunk("employeeSchedule/fetchData", async () => {
//   const response = await fetch("https://api.example.com/data");
const employee_ID = sessionStorage.getItem("employee_ID");
const response = await wingWiseApi.get(`/user/crewSchedule?id=${employee_ID}`)
  return await response.data.data[0];
});

const employeeScheduleSlice = createSlice({
  name: "employeeSchedule",
  initialState: {
    flightSchedule: {},
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.flightSchedule = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default employeeScheduleSlice.reducer;
