import {createSlice} from '@reduxjs/toolkit';
import {useReducer} from 'react';

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
    setAuthorizationToken: (state, action) => {
      state.AuthorizationToken = action.payload;
    },
  },
});

export default slice.reducer;

// Actions

export const {setNewInstallation, setAuthorizationToken} = slice.actions;

// Selectors

export const getIsNewInstallation = state => state.userReducer.newInstallation;
export const getAuthorizationToken = state =>
  state.userReducer.AuthorizationToken;
