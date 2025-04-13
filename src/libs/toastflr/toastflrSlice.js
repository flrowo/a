import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toastrs: [],
};

const toastflrSlice = createSlice({
    name: 'toastflrSlice',
    initialState,
    reducers: {
        addToastr: (state, action) => {
            state.toastrs.push(action.payload);
        },
        removeToastr: (state, action) => {
            state.toastrs = state.toastrs.filter(toastr => toastr.timestamp !== action.payload);
        }
    },
});

export const {
    addToastr,
    removeToastr,
} = toastflrSlice.actions;
export default toastflrSlice.reducer;