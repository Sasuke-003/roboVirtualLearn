import {showErrorMessage, showSuccessMessage} from './popup';
import {getHoursMinutesFromMinutes} from './date';
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

import {setVideoTime, getVideoTime} from './videoTime';

export const utils = {
  showErrorMessage,
  showSuccessMessage,
  validateEmail,
  validateUserName,
  validatePassword,
  setAuthToken,
  clearAuthToken,
  saveUserDetails,
  getHoursMinutesFromMinutes,
  getAuthToken,
  toTitleCase,
  isValidTwitterLink,
  isValidFacebookLink,
  setVideoTime,
  getVideoTime,
};
