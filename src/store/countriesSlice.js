import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Countries
export const getAllCountries = createAsyncThunk(
  "countries/getAllCountries",
  async () => {
    try {
      const response = await axios.get(
        `https://apiv3.apifootball.com/?action=get_countries&APIkey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Competitions
export const getCompetitions = createAsyncThunk(
  "countries/getCompetitions",
  async (id) => {
    try {
      const response = await axios.get(
        `https://apiv3.apifootball.com/?action=get_leagues&country_id=${id}&APIkey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const coutriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    competitions: [],
    loading: false,
    error: false,
  },

  extraReducers: (builder) => {
    builder.addCase(getAllCountries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.countries = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getAllCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getCompetitions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCompetitions.fulfilled, (state, action) => {
      state.loading = false;
      state.competitions = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getCompetitions.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default coutriesSlice.reducer;
