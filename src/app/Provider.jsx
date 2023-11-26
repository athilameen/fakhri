"use client";


import { configureStore } from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import userReducer from "@/features/user";

const store = configureStore({
  reducer : {
    user : userReducer,
  }
});

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};