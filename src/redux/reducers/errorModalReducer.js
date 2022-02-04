import {createSlice} from '@reduxjs/toolkit';

// Slice

const initialState = {
  isError: false,
  errorMessage: '',
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.isError = true;
      state.errorMessage = action.payload;
    },
    clearError: (state, action) => {
      state.isError = false;
      state.errorMessage = '';
    },
  },
});

export default slice.reducer;

// Actions

export const {setError, clearError} = slice.actions;

// Selectors

export const getErrorStatus = state => state.errorModalReducer.isError;
export const getErrorMessage = state => state.errorModalReducer.errorMessage;
