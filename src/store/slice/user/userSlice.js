import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../../configurations/environments";
import { RequestConfig } from "../../../helpers/RequestConfig";
const initialState = {
  usersState: {
    message: "",
    status: false,
    users: [],
    totalRows: 0,
  },
  userByIdState: {
    message: "",
    status: "idle",
    user: [],
  },
};
export const getAllUsersRedux = createAsyncThunk(
  "users/getAllUserss",
  async (props) => {
    const { page, size } = props;
    const response = await axios.get(
      `${baseURL}/api/admin/user/getAll/${page}/${size}`,
      RequestConfig()
    );
    return response.data;
  }
);
export const getUserById = createAsyncThunk("users/getById", async (id) => {
  const response = await axios.get(
    `${baseURL}/api/admin/user/${id}`,
    RequestConfig()
  );
  return response.data;
});
export const getUsersSlice = createSlice({
  name: "allUserssState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersRedux.pending, (state) => {
        state.usersState.status = true;
      })
      .addCase(getAllUsersRedux.fulfilled, (state, action) => {
        state.usersState.status = false;
        state.usersState.users = action.payload.data && action.payload.data;
        state.usersState.message =
          action.payload.message && action.payload.message;
        state.usersState.totalRows = action.payload.pagination.totalRecords;
      })
      .addCase(getAllUsersRedux.rejected, (state, action) => {
        state.usersState.status = "idle";
      })
      .addCase(getUserById.pending, (state) => {
        state.userByIdState.status = "loading";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userByIdState.status = "success";
        state.userByIdState.user = action.payload.data && action.payload.data;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.userByIdState.status = "failed";
      })
      .addCase("RESET", () => initialState);
  },
});
export default getUsersSlice.reducer;
