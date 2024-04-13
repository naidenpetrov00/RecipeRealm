import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PictureState {
  value: string | null;
}

const initialState: PictureState = {
  value: localStorage.getItem("picture"),
};

export const profPictureSlice = createSlice({
  name: "profilePicture",
  initialState,
  reducers: {
    changePictureState: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      localStorage.setItem("picture", action.payload);
    },
  },
});

export const { changePictureState } = profPictureSlice.actions;

export default profPictureSlice.reducer;
