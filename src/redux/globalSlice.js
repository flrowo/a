import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    page: null,
};

const globalSlice = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        }
    },
});

export function setUrlPage(value) {
    
}

export const { setPage } = globalSlice.actions;
export default globalSlice.reducer;