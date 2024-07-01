import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  recomendedMeals: [],
  singleMeal: [],
  savedMeals: [],
  myRecipes: [],
  commonMeals: [],
  status: "idle",
  error: null,
};

export const recommendMeals = createAsyncThunk(
  "meals/recommendMeals",
  async ({ ingredients, lang }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/meals/recommendMeal?lang=${lang}`,
        {
          params: {
            ingredients,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
      console.log("res from Api", response.data);
      return response.data.Recommendation;
    } catch (error) {
      console.error("Error from API", error.message);
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

export const fetchSavedMeals = createAsyncThunk(
  "meals/fetchSavedMeals",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/meals?isSaved=true&id=${userId}`
      );
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMyRecipes = createAsyncThunk(
  "meals/fetchMyRecipes",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://fast-plat1.vercel.app/meals`);
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchCommonMeals = createAsyncThunk(
  "meals/fetchCommonMeals",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/meals/common-meals`,
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recommendMeals.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(recommendMeals.fulfilled, (state, action) => {
        state.recomendedMeals = action.payload;
        state.status = "succeeded";
      })
      .addCase(recommendMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchSingleMeal.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSingleMeal.fulfilled, (state, action) => {
        state.singleMeal = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSingleMeal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchSavedMeals.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSavedMeals.fulfilled, (state, action) => {
        state.savedMeals = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSavedMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchMyRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMyRecipes.fulfilled, (state, action) => {
        state.myRecipes = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchMyRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCommonMeals.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCommonMeals.fulfilled, (state, action) => {
        state.commonMeals = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCommonMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const getRecommendMeals = (state) => state.meals.recomendedMeals;
export const getSingleMeal = (state) => state.meals.singleMeal;
export const getSavedMeals = (state) => state.meals.savedMeals;
export const getMyRecipes = (state) => state.meals.myRecipes;
export const getCommonMeals = (state) => state.meals.commonMeals;
export const getMealsStatus = (state) => state.meals.status;
export const getMealsError = (state) => state.meals.error;

export default mealsSlice.reducer;
