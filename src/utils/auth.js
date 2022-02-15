import {store} from '../redux/store';
import {
  setNewAuthToken,
  clearExistingAuthToken,
  setUserDetails,
} from '../redux/reducers/userReducer.js';

export const setAuthToken = token => {
  store.dispatch(setNewAuthToken(token));
};
export const clearAuthToken = () => {
  store.dispatch(clearExistingAuthToken());
};
export const saveUserDetails = details => {
  store.dispatch(setUserDetails(details));
};

export const getAuthToken = () => {
  const token = store.getState().userReducer.AuthorizationToken;
  return token;
};
