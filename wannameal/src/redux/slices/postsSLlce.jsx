import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state of the slice
const initialState = {
  posts: [],
  comments: [],
  singlePost: null,
  status: "idle",
  error: null,
};

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://fast-plat1.vercel.app/post/create",
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
export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/post/${postId}`
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
export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://fast-plat1.vercel.app/post/${postId}/like`,
        {},
        {
          headers: {
            token: `${token}`,
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
export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async ({ postId, commentData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://fast-plat1.vercel.app/post/${postId}/comment`,
        commentData,
        {
          headers: {
            token: `${token}`,
            "Content-Type": "application/json",
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

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload : action.error.message;
      })
      .addCase(commentPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.comments = action.payload;
      })
      .addCase(commentPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload : action.error.message;
      })
      .addCase(fetchPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.singlePost = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload : action.error.message;
      });
  },
});

export default postsSlice.reducer;
