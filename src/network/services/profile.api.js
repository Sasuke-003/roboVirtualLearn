import {virtualLearn} from '../axiosInstance';
import {store} from '../../redux/store';

import URL from '../url.json';
const config = () => {
  const token = store.getState().userReducer.AuthorizationToken;
  return {headers: {Authorization: token}};
};

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
    return await virtualLearn.patch(
      URL.profile.uploadProfilePic,
      {image},
      config(),
    );
  },
};
