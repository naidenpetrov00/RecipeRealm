import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: false,
  },
  reducers: {
    authenticated: (state) => {
      state.value = true;
    },
    nonAuthenticated: (state) => {
      state.value = false;
    },
  },
});

export const { authenticated, nonAuthenticated } = authSlice.actions;

export default authSlice.reducer;
