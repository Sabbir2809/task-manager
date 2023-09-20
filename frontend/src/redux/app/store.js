import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "../features/settingSlice";
import taskReducer from "../features/taskSlice";

export default configureStore({
  reducer: {
    settings: settingReducer,
    tasks: taskReducer,
  },
});
