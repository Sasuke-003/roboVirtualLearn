import {createSlice} from '@reduxjs/toolkit';

// Slice

const initialState = {
  newInstallation: true,
  AuthorizationToken: '',
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNewInstallation: (state, action) => {
      state.newInstallation = action.payload;
    },
  },
});

export default slice.reducer;

// Actions

export const {setNewInstallation} = slice.actions;

// Selectors

export const getIsNewInstallation = state => state.userReducer.newInstallation;
