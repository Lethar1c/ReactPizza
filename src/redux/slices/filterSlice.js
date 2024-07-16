import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  sortParameterIndex: 0,
  searchText: ""
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setParameterIndex: (state, action) => {
            state.sortParameterIndex = action.payload
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        }
    }
});

export const {setCategory, setParameterIndex, setSearchText} = filterSlice.actions;

export default filterSlice.reducer;