import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "eng", // Default language is English
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    switchToEnglish: (state) => {
      state.language = "eng";
    },
    switchToArabic: (state) => {
      state.language = "arab";
    },
  },
});

export const { switchToEnglish, switchToArabic } = languageSlice.actions;
export const getLanguage = (state) => state.language.language;
export default languageSlice.reducer;
