import { configureStore } from "@reduxjs/toolkit";
import coutriesReducer from "./countriesSlice";
import resultsReducer from "./resultsSlice";
import standingsReducer from "./standingsSlice";
import newsReducer from "./newsSlice";

export const store = configureStore({
  reducer: {
    countries: coutriesReducer,
    results: resultsReducer,
    standings: standingsReducer,
    news: newsReducer,
  },
});
