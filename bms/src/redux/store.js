import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/reduxAuth/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
