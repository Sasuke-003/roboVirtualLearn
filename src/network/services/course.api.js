import {virtualLearn} from '../axiosInstance';
import {store} from '../../redux/store';

import URL from '../url.json';
const config = () => {
  const token = store.getState().userReducer.AuthorizationToken;
  return {headers: {Authorization: token}};
};

export const course = {
  getUserDetails: async () => {
    console.log(config());
    return await virtualLearn.get(URL.course.getUserDetails, config());
  },
};
