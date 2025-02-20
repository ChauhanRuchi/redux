import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counterSlice";
import userSlice from "../redux/userCrudSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users:userSlice
  },
});

export default store;
