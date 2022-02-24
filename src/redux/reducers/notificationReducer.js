import {createSlice} from '@reduxjs/toolkit';
import {useReducer} from 'react';

// Slice

const initialState = {
  notificationData: [],
};
// pushNotification: false,
// notificationSound: false,

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setPushNotification: (state, action) => {
      let index;
      for (let i = 0; i < state.notificationData.length; i++) {
        if (state.notificationData[i].hasOwnProperty(action.payload)) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        if (
          state.notificationData[index][action.payload].hasOwnProperty(
            'pushNotification',
          )
        ) {
          state.notificationData[index][action.payload] = {
            ...state.notificationData[index][action.payload],
            pushNotification:
              !state.notificationData[index][action.payload].pushNotification,
          };
        } else {
          state.notificationData[index][action.payload] = {
            ...state.notificationData[index][action.payload],
            pushNotification: true,
          };
        }
      } else {
        state.notificationData.push({
          [action.payload]: {pushNotification: true},
        });
      }

      // state.pushNotification = !state.pushNotification;
    },
    setNotificationSound: (state, action) => {
      let index;
      for (let i = 0; i < state.notificationData.length; i++) {
        if (state.notificationData[i].hasOwnProperty(action.payload)) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        if (
          state.notificationData[index][action.payload].hasOwnProperty(
            'notificationSound',
          )
        ) {
          state.notificationData[index][action.payload] = {
            ...state.notificationData[index][action.payload],
            notificationSound:
              !state.notificationData[index][action.payload].notificationSound,
          };
        } else {
          state.notificationData[index][action.payload] = {
            ...state.notificationData[index][action.payload],
            notificationSound: true,
          };
        }
      } else {
        state.notificationData.push({
          [action.payload]: {notificationSound: true},
        });
      }

      // state.notificationSound = !state.notificationSound;
    },
    clearNotification: (state, action) => {
      state.notificationData = [];
    },
  },
});

export default slice.reducer;

// Actions

export const {setPushNotification, setNotificationSound, clearNotification} =
  slice.actions;

// Selectors

export const getNotificationData = state =>
  state.notificationReducer.notificationData;
// export const getPushNotification = state =>
//   state.notificationReducer.pushNotification;
// export const getNotificationSound = state =>
//   state.notificationReducer.notificationSound;
