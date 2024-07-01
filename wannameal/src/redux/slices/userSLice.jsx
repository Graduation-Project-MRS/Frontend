import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,    
  updatedUser: null,
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/users/getMe`,
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, token, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://fast-plat1.vercel.app/users/${userId}`,
        formData,
        {
          headers: {
            token: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch User by ID
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.updatedUser = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const getLoggoedUser = (state) => state.user.user;
export const getUpdatedUser = (state) => state.user.updatedUser;
export const userSatus = (state) => state.user.status;
export const userError = (state) => state.user.error;

export default userSlice.reducer;
