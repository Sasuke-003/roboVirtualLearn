import {createSlice} from '@reduxjs/toolkit';
import {useReducer} from 'react';

// Slice

const initialState = {
  pushNotification: false,
  notificationSound: false,
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setPushNotification: (state, action) => {
      state.pushNotification = !state.pushNotification;
    },
    setNotificationSound: (state, action) => {
      state.notificationSound = !state.notificationSound;
    },
  },
});

export default slice.reducer;

// Actions

export const {setPushNotification, setNotificationSound} = slice.actions;

// Selectors

export const getPushNotification = state =>
  state.notificationReducer.pushNotification;
export const getNotificationSound = state =>
  state.notificationReducer.notificationSound;
