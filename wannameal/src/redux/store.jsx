import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import registerSlice from "./slices/registerSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        signup: registerSlice,
    },
});

export default store;