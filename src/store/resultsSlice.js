import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Results
export const getResults = createAsyncThunk(
  "results/getResults",
  async (args) => {
    try {
      const { id, fromDate, toDate } = args;
      const response = await axios.get(
        `https://apiv3.apifootball.com/?action=get_events&from=${fromDate}&to=${toDate}&league_id=${id}&APIkey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Stats
export const getMatchStats = createAsyncThunk(
  "results/getMatchStats",
  async (matchId) => {
    try {
      const response = await axios.get(
        `https://apiv3.apifootball.com/?action=get_statistics&match_id=${matchId}&APIkey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.data;
      const statsProps = [
        "Goal Kick",
        "Shots On Goal",
        "Penalty",
        "Free Kick",
        "On Target",
        "Shots Total",
        "Fouls",
        "Corners",
        "Offsides",
        "Ball Possession",
        "Yellow Cards",
        "Passes Total",
        "Passes Accurate",
      ];
      const dobijeni = data[`${matchId}`]?.statistics;
      const opetDobijeni = dobijeni.filter((item) =>
        statsProps.includes(item.type)
      );
      const duplicated = [];
      const finalData = opetDobijeni.filter((item) => {
        const isDuplicated = duplicated.includes(item.type);
        if (!isDuplicated) {
          duplicated.push(item.type);
          return true;
        }
        return false;
      });

      return finalData;
    } catch (error) {
      console.log(error);
    }
  }
);

// Live results

export const getLIveResults = createAsyncThunk(
  "results/getLiveResults",
  async () => {
    try {
      const response = await axios.get(
        `https://apiv3.apifootball.com/?action=get_events&match_live=1&APIkey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.data;
      return data.slice(0, 100);
    } catch (error) {
      console.log(error);
    }
  }
);

const resultsSlice = createSlice({
  name: "results",
  initialState: {
    results: [],
    stats: [],
    live: [],
    loading: false,
    error: false,
  },
  // reducers: {
  //   setResultsTo: (state) => {
  //     state.results = [];
  //     return state;
  //   },
  // },

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
      state.error = "No results for this competition!";
      console.log(action.payload);
    });
    builder.addCase(getMatchStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMatchStats.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
      console.log("Stats ====> ", action.payload);
    });
    builder.addCase(getMatchStats.rejected, (state, action) => {
      state.error = "No stats";
      console.log(action.payload);
    });

    builder.addCase(getLIveResults.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLIveResults.fulfilled, (state, action) => {
      state.loading = false;
      state.live = action.payload;
      console.log("Results =====> ", action.payload);
    });
    builder.addCase(getLIveResults.rejected, (state, action) => {
      state.loading = false;
      state.error = "No results for this competition!";
      console.log(action.payload);
    });
  },
});

export default resultsSlice.reducer;
// export const { setResultsTo } = resultsSlice.actions;
