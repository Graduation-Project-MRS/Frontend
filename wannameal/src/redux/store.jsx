import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import registerSlice from "./slices/registerSlice";
import recomendedMealsSlice from "./slices/recomendedMealsSlice";
import postsSlice from "./slices/postsSLlce";
import communityUserSlice from "./slices/communityUserSlice";
import language from "./slices/language";
import themeSlice from "./slices/systemModeSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    signup: registerSlice,
    meals: recomendedMealsSlice,
    posts: postsSlice,
    communityUser: communityUserSlice,
    language: language,
    theme: themeSlice,
  },
});

export default store;
