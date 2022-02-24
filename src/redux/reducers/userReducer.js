import {createSlice} from '@reduxjs/toolkit';
import {useReducer} from 'react';

// Slice

const initialState = {
  newInstallation: true,
  AuthorizationToken: '',
  userDetails: {
    data: {
      number: '1',
      fullname: '1',
      username: '1',
      email: '1',
      occupation: '1',
      dateOfBirth: new Date(),
      gender: '1',
      image:
        'https://images.unsplash.com/photo-1645584579033-0ed0404624f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      coverImage:
        'https://images.unsplash.com/photo-1645610448847-71b25da351b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
  },
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
