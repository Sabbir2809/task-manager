import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "../features/settingSlice";

export default configureStore({
  reducer: {
    settings: settingReducer,
  },
});
