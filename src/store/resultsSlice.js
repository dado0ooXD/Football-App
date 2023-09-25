import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Countries
export const getResults = createAsyncThunk(
  "results/getResults",
  async (args) => {
    try {
      const { id, toDate } = args;
      const response = await axios.get(
        `https://apiv3.apifootball.com/?action=get_events&from=2023-09-17&to=${toDate}&league_id=${id}&APIkey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const resultsSlice = createSlice({
  name: "results",
  initialState: {
    results: [],
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getResults.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getResults.fulfilled, (state, action) => {
      state.loading = false;
      state.results = action.payload;
      console.log("Results =====> ", action.payload);
    });
    builder.addCase(getResults.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.log(action.payload);
    });
  },
});

export default resultsSlice.reducer;
