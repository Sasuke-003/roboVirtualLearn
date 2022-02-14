import {showErrorMessage, showSuccessMessage} from './popup';
import {
  validateEmail,
  validateUserName,
  validatePassword,
  toTitleCase,
  isValidTwitterLink,
  isValidFacebookLink,
} from './validate';
import {
  setAuthToken,
  clearAuthToken,
  saveUserDetails,
  getAuthToken,
} from './auth';

export const utils = {
  showErrorMessage,
  showSuccessMessage,
  validateEmail,
  validateUserName,
  validatePassword,
  setAuthToken,
  clearAuthToken,
  saveUserDetails,
  getAuthToken,
  toTitleCase,
  isValidTwitterLink,
  isValidFacebookLink,
};
