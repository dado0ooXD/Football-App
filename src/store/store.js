import { configureStore } from "@reduxjs/toolkit";
import coutriesReducer from "./countriesSlice";
import resultsReducer from "./resultsSlice";

export const store = configureStore({
  reducer: {
    countries: coutriesReducer,
    results: resultsReducer,
  },
});
