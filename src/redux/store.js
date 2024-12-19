import { configureStore } from "@reduxjs/toolkit";
import savedArticlesReducer from "./slices/savedArticlesSlice";

const store = configureStore({
  reducer: {
    savedArticles: savedArticlesReducer,
  },
});

export default store;
