import { configureStore } from "@reduxjs/toolkit";
import coutriesReducer from "./countriesSlice";

export const store = configureStore({
  reducer: {
    countries: coutriesReducer,
  },
});
