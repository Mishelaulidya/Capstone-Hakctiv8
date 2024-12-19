import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  savedArticles: JSON.parse(localStorage.getItem("savedArticles")) || [],
  news: [], 
  loading: false,
  error: null,
};


export const fetchNews = createAsyncThunk(
  "savedArticles/fetchNews",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY; 
      const response = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&api-key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Gagal memuat data dari API.");
      }
      const data = await response.json();
      if (!data.response || !data.response.docs) {
        throw new Error("Data tidak valid dari API.");
      }
      return data.response.docs; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const savedArticlesSlice = createSlice({
  name: "savedArticles",
  initialState,
  reducers: {
    saveArticle: (state, action) => {
      const article = action.payload;
      const isAlreadySaved = state.savedArticles.some(
        (a) => a.url === article.url
      );
      if (!isAlreadySaved) {
        state.savedArticles.push(article);
        localStorage.setItem(
          "savedArticles",
          JSON.stringify(state.savedArticles)
        ); 
      }
    },
    removeArticle: (state, action) => {
      state.savedArticles = state.savedArticles.filter(
        (a) => a.url !== action.payload
      );
      localStorage.setItem(
        "savedArticles",
        JSON.stringify(state.savedArticles)
      ); 
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload;
        state.loading = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Terjadi kesalahan.";
      })
  }
})


export const { saveArticle, removeArticle } = savedArticlesSlice.actions;
export default savedArticlesSlice.reducer;
