import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import profilePictureReducer from "./profPictureSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    picture: profilePictureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
