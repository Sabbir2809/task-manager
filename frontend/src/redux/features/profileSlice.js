import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    info: [],
  },
  reducers: {
    setProfileDetails: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { setProfileDetails } = profileSlice.actions;
export default profileSlice.reducer;
