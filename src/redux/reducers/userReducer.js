import {createSlice} from '@reduxjs/toolkit';

// Slice

const initialState = {
  newInstallation: true,
  AuthorizationToken: '',
  userDetails: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNewInstallation: (state, action) => {
      state.newInstallation = action.payload;
    },
    setNewAuthToken: (state, action) => {
      state.AuthorizationToken = action.payload;
    },
    clearExistingAuthToken: (state, action) => {
      state.AuthorizationToken = '';
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state, action) => {
      state.userDetails = null;
    },
  },
});

export default slice.reducer;

// Actions

export const {
  setNewInstallation,
  setNewAuthToken,
  clearExistingAuthToken,
  setUserDetails,
  clearUserDetails,
} = slice.actions;

// Selectors

export const getIsNewInstallation = state => state.userReducer.newInstallation;
export const getAuthToken = state => state.userReducer.AuthorizationToken;
export const getUserDetails = state => state.userReducer.userDetails;
