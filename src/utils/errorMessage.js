import {store} from '../redux/store';
import {setError, clearError} from '../redux/reducers/errorModalReducer';

const modalTimeOut = 2; // In seconds

export const showErrorMessage = (message = '') => {
  if (message === '') return;
  store.dispatch(setError(message));
  setTimeout(() => {
    store.dispatch(clearError());
  }, modalTimeOut * 1000);
};
