import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userInfo } = userSlice.actions;
export default userSlice.reducer;
