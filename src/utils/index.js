import {showErrorMessage, showSuccessMessage} from './popup';
import {validateEmail, validateUserName, validatePassword} from './validate';
import {setAuthToken, clearAuthToken, saveUserDetails} from './auth';
import {getHoursMinutesFromMinutes} from './date';

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
};
