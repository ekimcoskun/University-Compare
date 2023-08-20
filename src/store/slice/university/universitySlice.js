import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../../configurations/environments";
import { RequestConfig } from "../../../helpers/RequestConfig";
const initialState = {
  universityState: {
    message: "",
    status: false,
    universities: [],
    pagination: {},
  },
  universityByIdState: {
    message: "",
    status: "idle",
    university: [],
  },
  universitiesForComparisonState: {
    message: "",
    status: "idle",
    universities: [],
  },
};
export const getAllUniversities = createAsyncThunk(
  "universities/getAllUniversities",
  async (props) => {
    const { page, size, filter } = props;
    const response = await axios.get(
      `${baseURL}/api/university/getAll/${page}/${size}/${filter}`,
      RequestConfig()
    );
    return response.data;
  }
);
export const getUniversityById = createAsyncThunk("university/getById", async (id) => {
  const response = await axios.get(`${baseURL}/api/university/getById/${id}`, RequestConfig());
  return response.data;
});

export const getUniveritiesForComparison = createAsyncThunk(
  "universities/getUniversitiesForComparison",
  async (props) => {
    const { ids } = props;
    const response = await axios.get(`${baseURL}/api/university/getByIds/${ids}`, RequestConfig());
    return response.data;
  }
);

export const getUniversitySlice = createSlice({
  name: "allUniversitiesState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUniversities.pending, (state) => {
        state.universityState.status = true;
      })
      .addCase(getAllUniversities.fulfilled, (state, action) => {
        state.universityState.status = false;
        state.universityState.universities = action.payload.data && action.payload.data;
        state.universityState.message = action.payload.message && action.payload.message;
        state.universityState.pagination = action.payload?.pagination;
      })
      .addCase(getAllUniversities.rejected, (state, action) => {
        state.universityState.status = "idle";
      })
      .addCase(getUniversityById.pending, (state) => {
        state.universityByIdState.status = "loading";
      })
      .addCase(getUniversityById.fulfilled, (state, action) => {
        state.universityByIdState.status = "success";
        state.universityByIdState.university = action.payload.data && action.payload.data;
      })
      .addCase(getUniversityById.rejected, (state, action) => {
        state.universityByIdState.status = "failed";
      })
      .addCase(getUniveritiesForComparison.pending, (state) => {
        state.universitiesForComparisonState.status = "loading";
      })
      .addCase(getUniveritiesForComparison.fulfilled, (state, action) => {
        state.universitiesForComparisonState.status = "success";
        state.universitiesForComparisonState.universities =
          action.payload.data && action.payload.data;
      })
      .addCase(getUniveritiesForComparison.rejected, (state, action) => {
        state.universitiesForComparisonState.status = "failed";
      })
      .addCase("RESET", () => initialState);
  },
});
export default getUniversitySlice.reducer;
