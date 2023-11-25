import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestConfig } from "../../../helpers/RequestConfig";
import { baseURL } from "../../../configurations/environments";
import axios from "axios";

const initialState = {
  userCount: {
    message: "",
    status: false,
    count: 0,
  },
  universityCount: {
    message: "",
    status: false,
    count: 0,
  },
};

export const getUserCount = createAsyncThunk(
  "dashboard/getUserCount",
  async () => {
    const response = await axios.get(
      `${baseURL}/api/dashboard/userCount`,
      RequestConfig()
    );
    return response.data;
  }
);

export const getUniversityCount = createAsyncThunk(
  "dashboard/getUniversityCount",
  async () => {
    const response = await axios.get(
      `${baseURL}/api/university/count`,
      RequestConfig()
    );
    return response.data;
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCount.pending, (state) => {
        state.userCount.status = true;
      })
      .addCase(getUserCount.fulfilled, (state, action) => {
        state.userCount.status = false;
        state.userCount.count = action.payload.data && action.payload.data;
        state.userCount.message =
          action.payload.message && action.payload.message;
      })
      .addCase(getUserCount.rejected, (state, action) => {
        state.userCount.status = false;
      })
      .addCase(getUniversityCount.pending, (state) => {
        state.universityCount.status = true;
      })
      .addCase(getUniversityCount.fulfilled, (state, action) => {
        state.universityCount.status = false;
        state.universityCount.count =
          action.payload.data && action.payload.data;
        state.universityCount.message =
          action.payload.message && action.payload.message;
      })
      .addCase(getUniversityCount.rejected, (state, action) => {
        state.universityCount.status = false;
      });
  },
});

export default dashboardSlice.reducer;
