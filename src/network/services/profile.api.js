import {virtualLearn} from '../axiosInstance';
import {store} from '../../redux/store';

import URL from '../url.json';
const config = () => {
  const token = store.getState().userReducer.AuthorizationToken;
  return {headers: {Authorization: token}};
};
let authToken = store.getState().userReducer.AuthorizationToken;

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
  uploadProfilePic: async image => {
    return await virtualLearn.patch(URL.profile.uploadProfilePic, image, {
      headers: {
        Authorization: authToken,
        'content-type':
          'multipart/form-data;boundary=--------------------------299186221864974250459453',
      },
    });
  },
  uploadCoverPic: async formData => {
    return await virtualLearn.patch(URL.profile.uploadCoverPic, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: authToken,
      },
    });
  },
};
