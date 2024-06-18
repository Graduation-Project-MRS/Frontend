import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  recomendedMeals: [],
  singleMeal: [],
  loading: false,
  error: null,
};
export const recommendMeals = createAsyncThunk(
  "meals/recommendMeals",
  async (ingredients, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/meals/recommendMeal`,
        {
          params: {
            ingredients: ingredients,
          },
        }
      );
      return response.data.Recommendation;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleMeal = createAsyncThunk(
  "meals/fetchSingleMeal",
  async (productId) => {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await res.json();
    return data;
  }
);

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recommendMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recommendMeals.fulfilled, (state, action) => {
        state.recomendedMeals = action.payload;
        state.loading = false;
      })
      .addCase(recommendMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleMeal.fulfilled, (state, action) => {
        state.singleMeal = action.payload;
      });
  },
});

export const getRecommendMeals = (state) => state.meals.recomendedMeals;
export const getSingleMeal = (state) => state.meals.singleMeal;

export default mealsSlice.reducer;
