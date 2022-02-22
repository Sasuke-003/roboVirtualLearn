import {virtualLearn} from '../axiosInstance';
import {store} from '../../redux/store';

import URL from '../url.json';
const config = () => {
  const token = store.getState().userReducer.AuthorizationToken;
  return {headers: {Authorization: token}};
};
let authToken = store.getState().userReducer.AuthorizationToken;
// console.log(authToken);
export const profile = {
  changePassword: async (oldpassword, newpassword) => {
    return await virtualLearn.patch(
      URL.profile.changePassword,
      {oldpassword, newpassword},
      config(),
    );
  },
  updateDetails: async (
    fullname,
    occupation,
    dateOfBirth,
    gender,
    twitterLink,
    facebookLink,
    email,
  ) => {
    // console.log(dateOfBirth);
    return await virtualLearn.patch(
      URL.profile.updateDetails,
      {
        fullname,
        occupation,
        dateOfBirth,
        gender,
        twitterLink,
        facebookLink,
        email,
      },
      config(),
    );
  },
  uploadProfilePic: async formData => {
    console.log('api', formData);
    return await virtualLearn.patch(URL.profile.uploadProfilePic, formData, {
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: authToken,
      },
    });
  },
  uploadCoverPic: async formData => {
    return await virtualLearn.patch(URL.profile.uploadCoverPic, formData, {
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: authToken,
      },
    });
  },
};
