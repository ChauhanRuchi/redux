import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counterSlice";
import userSlice from "../redux/userSlice";
import postSlice from "../redux/postsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users:userSlice,
    posts:postSlice

  },
});

export default store;
