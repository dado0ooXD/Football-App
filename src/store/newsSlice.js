import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// News
export const getAllNews = createAsyncThunk("home/getAllNews", async () => {
  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/news?apikey=${process.env.REACT_APP_NEWS_KEY}&q=soccer`
    );
    const data = await response.data.results;
    return data.slice(0, 3);
  } catch (error) {
    console.log(error);
  }
});

const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    openSnack: false,

    favourites: favourites,
    loading: false,
    error: false,
  },
  reducers: {
    addToFavourites: (state, action) => {
      const favouriteMatch = action.payload;
      const duplicate = state.favourites.find(
        (item) => item.match_id === favouriteMatch.match_id
      );
      if (!duplicate) {
        state.favourites.push(favouriteMatch);
        localStorage.setItem("favourites", JSON.stringify(state.favourites));
        return state;
      }
    },
    removeFromFavourites: (state, action) => {
      const targetMatch = action.payload;
      state.favourites = state.favourites.filter(
        (item) => item.match_id !== targetMatch.match_id
      );
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    openSnackbar: (state, action) => {
      state.openSnack = true;
    },
    closeSnackbar: (state, action) => {
      state.openSnack = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllNews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllNews.fulfilled, (state, action) => {
      state.loading = false;
      state.news = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getAllNews.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default newsSlice.reducer;
export const {
  addToFavourites,
  removeFromFavourites,
  openSnackbar,
  closeSnackbar,
} = newsSlice.actions;
