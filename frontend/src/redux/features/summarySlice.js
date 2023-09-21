import { createSlice } from "@reduxjs/toolkit";

const summarySlice = createSlice({
  // 1. state
  name: "summary",
  initialState: {
    value: [],
  },

  // reducer function(action)
  reducers: {
    setSummary: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSummary } = summarySlice.actions;
export default summarySlice.reducer;
