import { createSlice } from "@reduxjs/toolkit";

import { IInitialState } from "./user-interface";
import { stat } from "fs";

const initialState: IInitialState = {
  user: null,
  isLoading: false,
  chainId: null,
  sound: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSound: (state, action) => {
      state.sound = action.payload;
    },
    setChainId: (state, action) => {
      state.chainId = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.chainId = null;
      state.isLoading = false;
    },
  },
});
export const { setUser, setUserLoading, setChainId, logout, setSound } =
  userSlice.actions;
