// import createSagaMiddleware from 'redux-saga'
import { configureStore } from "@reduxjs/toolkit";
import universitySlice from "../slice/university/universitySlice";
import userInfo from "../authSlice";
import userSlice from "../slice/user/userSlice";
import dashboardSlice from "../slice/dashboard/dashboardSlice";
export const store = configureStore({
  reducer: {
    universitySlice: universitySlice,
    userInformation: userInfo,
    userSlice: userSlice,
    dashboardSlice: dashboardSlice,
  },
});
