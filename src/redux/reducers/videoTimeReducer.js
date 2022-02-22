import {createSlice} from '@reduxjs/toolkit';

// Slice

const initialState = {
  time: 0,
};

const slice = createSlice({
  name: 'videoTime',
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload;
    },
    clearTime: (state, action) => {
      state.time = 0;
    },
  },
});

export default slice.reducer;

// Actions

export const {setTime, clearTime} = slice.actions;

// Selectors

export const getTime = state => state.videoTimeReducer.time;
