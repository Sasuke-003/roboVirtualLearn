import {createSlice} from '@reduxjs/toolkit';

// Slice

const initialState = {
  time: 0,
  maxLength: 1,
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
    setMaxLength: (state, action) => {
      state.maxLength = action.payload;
    },
    clearMaxLength: (state, action) => {
      state.maxLength = 0;
    },
  },
});

export default slice.reducer;

// Actions

export const {setTime, clearTime, setMaxLength, clearMaxLength} = slice.actions;

// Selectors

export const getTime = state => state.videoTimeReducer.time;
export const getMaxLength = state => state.videoTimeReducer.time;
