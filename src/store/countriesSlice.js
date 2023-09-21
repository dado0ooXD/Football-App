import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

const coutriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
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
  },
});

export default coutriesSlice.reducer;
