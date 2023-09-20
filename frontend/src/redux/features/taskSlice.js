import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    newTask: [],
    progressTask: [],
    canceledTask: [],
    completedTask: [],
  },

  reducers: {
    setNewTask: (state, action) => {
      state.newTask = action.payload;
    },
    setProgressTask: (state, action) => {
      state.progressTask = action.payload;
    },
    setCanceledTask: (state, action) => {
      state.canceledTask = action.payload;
    },
    setCompletedTask: (state, action) => {
      state.completedTask = action.payload;
    },
  },
});

export const { setNewTask, setProgressTask, setCanceledTask, setCompletedTask } = taskSlice.actions;
export default taskSlice.reducer;
