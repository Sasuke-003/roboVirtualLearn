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
  uploadProfilePic: async image => {
    console.log('api', image);
    // console.log('token', authToken);
    return await virtualLearn.patch(
      URL.profile.uploadProfilePic,
      image,
      config(),
      //   {
      //   headers: {
      //     // Accept: 'image/jpeg',
      //     Authorization: authToken,
      //     // 'Content-Type': 'multipart/form-data',
      //   },
      // }
    );
    // virtualLearn.interceptors.request.use(config => console.log(config));
    // return res;
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
