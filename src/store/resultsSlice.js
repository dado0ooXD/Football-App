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

// Pop Up stats

export const popUpStats = createAsyncThunk(
  "results/popUpStats",
  async (matchId) => {
    try {
      const response = axios.get(
        `https://apiv3.apifootball.com/?action=get_events&match_id=${matchId}&APIkey=${process.env.REACT_APP_API_KEY}`
      );
      const data = (await response).data;
      const matchData = [...data[0].cards, ...data[0].goalscorer]
        .map((detail) => ({
          ...detail,
        }))
        .concat(
          data[0].substitutions.home.map((substitution) => ({
            ...substitution,
            team: "home",
          }))
        )
        .concat(
          data[0].substitutions.away.map((substitution) => ({
            ...substitution,
            team: "away",
          }))
        )
        .sort((a, b) => {
          const parseTime = (timeString) => {
            if (timeString.includes("+")) {
              const [minutes, extraMinutes] = timeString.split("+").map(Number);
              return minutes + extraMinutes;
            } else {
              return parseInt(timeString, 10);
            }
          };

          const timeA = parseTime(a.time);
          const timeB = parseTime(b.time);
          return timeA - timeB;
        });
      return matchData.map((item) => ({
        time: item.time,
        away_scorer: item.away_scorer ? item.away_scorer : "",
        home_scorer: item.home_scorer ? item.home_scorer : "",
        card: item.card ? item.card : "",
        away_fault: item.away_fault ? item.away_fault : "",
        home_fault: item.home_fault ? item.home_fault : "",
        home_assist: item.home_assist ? item.home_assist : "",
        away_assist: item.away_assist ? item.away_assist : "",
        substitution: item.substitution ? item.substitution : "",
      }));
    } catch (error) {
      console.log(error);
    }
  }
);

// Match Stats
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

// All Stats

export const getAllStats = createAsyncThunk(
  "results/getAllStats",
  async (matchId) => {
    try {
      const response = axios.get(
        `https://apiv3.apifootball.com/?action=get_events&match_id=${matchId}&APIkey=${process.env.REACT_APP_API_KEY}`
      );
      const data = (await response).data;
      return data;
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
      return data
        .slice(0, 100)
        .sort((a, b) => {
          if (a.country_name === "England" && b.country_name !== "England") {
            return -1; // Stavka 'a' ide pre 'b'
          } else if (
            a.country_name !== "England" &&
            b.country_name === "England"
          ) {
            return 1; // Stavka 'b' ide pre 'a'
          } else {
            return 0; // Nema promene redosleda
          }
        })
        .filter((item, index) => item.match_status !== "Finished");
    } catch (error) {
      console.log(error);
    }
  }
);

const resultsSlice = createSlice({
  name: "results",
  initialState: {
    results: [],
    matchStats: [],
    live: [],
    popUpStats: [],
    oneMatch: [],
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
      state.error = "No results for this competition!";
      console.log(action.payload);
    });
    builder.addCase(getMatchStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMatchStats.fulfilled, (state, action) => {
      state.loading = false;
      state.matchStats = action.payload;
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
    builder.addCase(getAllStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllStats.fulfilled, (state, action) => {
      state.loading = false;
      state.oneMatch = action.payload;
      console.log("allStats =====> ", action.payload);
    });
    builder.addCase(getAllStats.rejected, (state, action) => {
      state.loading = false;
      state.error = "No results for this competition!";
      console.log(action.payload);
    });
    builder.addCase(popUpStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(popUpStats.fulfilled, (state, action) => {
      state.loading = false;
      state.popUpStats = action.payload;
      console.log("popup =====> ", action.payload);
    });
    builder.addCase(popUpStats.rejected, (state, action) => {
      state.loading = false;
      state.error = "No results for this competition!";
      console.log(action.payload);
    });
  },
});

export default resultsSlice.reducer;
export const { matchStat } = resultsSlice.actions;
