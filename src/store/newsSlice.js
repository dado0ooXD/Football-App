import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// News
export const getAllNews = createAsyncThunk("home/getAllNews", async () => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=football&from=2023-10-02&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWS_KEY}`
    );
    const data = await response.data;
    return data.articles.slice(0, 10);
  } catch (error) {
    console.log(error);
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    loading: false,
    error: false,
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
