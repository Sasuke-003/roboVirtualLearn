import {virtualLearn} from '../axiosInstance';

import URL from '../url.json';

export const user = {
  login: async loginDetails =>
    await virtualLearn.post(URL.auth.login, loginDetails),
};
