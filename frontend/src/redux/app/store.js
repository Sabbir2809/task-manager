import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "../features/settingSlice";
import summaryReducer from "../features/summarySlice";
import taskReducer from "../features/taskSlice";

export default configureStore({
  reducer: {
    settings: settingReducer,
    task: taskReducer,
    summary: summaryReducer,
  },
});
