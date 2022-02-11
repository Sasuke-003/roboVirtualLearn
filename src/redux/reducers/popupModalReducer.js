import {createSlice} from '@reduxjs/toolkit';

// Slice

const initialState = {
  showMessage: false,
  messageType: 'error', //  error, success
  message: '',
};

const slice = createSlice({
  name: 'messageModal',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.messageType = 'error';
      state.showMessage = true;
      state.message = action.payload;
    },
    setSuccess: (state, action) => {
      state.messageType = 'success';
      state.showMessage = true;
      state.message = action.payload;
    },
    clearMessage: (state, action) => {
      state.showMessage = false;
    },
  },
});

export default slice.reducer;

// Actions

export const {setError, setSuccess, clearMessage, showSearchScreenModal} =
  slice.actions;

// Selectors
export const getMessageStatus = state => state.popupModalReducer.showMessage;
export const getMessageType = state => state.popupModalReducer.messageType;
export const getMessage = state => state.popupModalReducer.message;
