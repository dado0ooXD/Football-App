import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Standings
export const getAllStandings = createAsyncThunk(
  "standings/getAllStandings",
  async (id) => {
    try {
      const response = await axios.get(
        `https://apiv3.apifootball.com/?action=get_standings&league_id=${id}&APIkey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const standingsSlice = createSlice({
  name: "standings",
  initialState: {
    standings: [],
    loading: false,
    error: false,
  },

  extraReducers: (builder) => {
    builder.addCase(getAllStandings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllStandings.fulfilled, (state, action) => {
      state.loading = false;
      state.standings = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getAllStandings.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default standingsSlice.reducer;
