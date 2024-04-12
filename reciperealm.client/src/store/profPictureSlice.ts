import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import defaultProfilePicture from "../assets/vecteezy_default-avatar-profile-icon-vector-in-flat-style_27708418.jpg";

interface PictureState {
  value: string;
}

const initialState: PictureState = {
  value: defaultProfilePicture,
};

export const profPictureSlice = createSlice({
  name: "profilePicture",
  initialState,
  reducers: {
    changePictureState: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changePictureState } = profPictureSlice.actions;

export default profPictureSlice.reducer;
