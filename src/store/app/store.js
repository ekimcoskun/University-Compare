// import createSagaMiddleware from 'redux-saga'
import { configureStore } from "@reduxjs/toolkit";
import universitySlice from "../slice/university/universitySlice";
import userInfo from "../authSlice";
export const store = configureStore({
  reducer: {
    universitySlice: universitySlice,
    userInformation: userInfo,
  },
});
