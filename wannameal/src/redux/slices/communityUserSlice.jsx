import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: null,
  suggestedUsers: [],
  follow: null,
  status: "idle",
  error: null,
};

export const getProfileById = createAsyncThunk(
  "communityUser/getProfileById",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/auth/profile/${userId}?lang=eng`,
        {
          headers: {
            token: token,
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

export const followUser = createAsyncThunk(
  "communityUser/followUser",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://fast-plat1.vercel.app/auth/follow/${userId}?lang=eng`,

        {},
        {
          headers: {
            token: token,
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

export const fetchSuggestedUsers = createAsyncThunk(
  "communityUser/fetchSuggestedUsers",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/auth/suggested?lang=eng`,
        {
          headers: {
            token: token,
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

const communityUserSlice = createSlice({
  name: "communityUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Profile by ID
      .addCase(getProfileById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Follow User
      .addCase(followUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.follow = action.payload;
        state.error = null;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Get Suggested Users
      .addCase(fetchSuggestedUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSuggestedUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.suggestedUsers = action.payload;
        state.error = null;
      })
      .addCase(fetchSuggestedUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const getProfile = (state) => state.communityUser.profile;
export const getSuggestedUsers = (state) => state.communityUser.suggestedUsers;

export default communityUserSlice.reducer;
