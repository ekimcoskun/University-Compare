// import createSagaMiddleware from 'redux-saga'
import { configureStore } from "@reduxjs/toolkit";
import universitySlice from "../slice/university/universitySlice";
export const store = configureStore({
  reducer: {
    universitySlice: universitySlice,
  },
});
