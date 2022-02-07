import {store} from '../redux/store';
import {
  setError,
  setSuccess,
  clearMessage,
} from '../redux/reducers/popupModalReducer';

const modalTimeOut = 2; // In seconds

export const showErrorMessage = (message = '') => {
  if (message === '') return;
  store.dispatch(setError(message));
  setTimeout(() => {
    store.dispatch(clearMessage());
  }, modalTimeOut * 1000);
};

export const showSuccessMessage = (message = '') => {
  if (message === '') return;
  store.dispatch(setSuccess(message));
  setTimeout(() => {
    store.dispatch(clearMessage());
  }, modalTimeOut * 1000);
};
