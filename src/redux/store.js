import { configureStore } from '@reduxjs/toolkit';
import globalSlice from "./globalSlice";
import toastflrSlice from "../libs/toastflr/toastflrSlice";

const store = configureStore({
    reducer: {
        globalSlice,
        toastflrSlice,
    },
});

export default store;