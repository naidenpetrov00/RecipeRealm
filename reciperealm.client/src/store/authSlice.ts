import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  value: boolean;
}

const initialState: AuthState = {
  value: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticated: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { authenticated } = authSlice.actions;

export default authSlice.reducer;
