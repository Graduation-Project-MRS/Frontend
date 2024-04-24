import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const loginUser = createAsyncThunk(
    "auth/login",
    async (user) => {
        try {
            const response = await axios.post("https://fast-plat1.vercel.app/auth/login", user);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;