import {virtualLearn} from '../axiosInstance';

import URL from '../url.json';

export const user = {
  login: async loginDetails =>
    await virtualLearn.post(URL.auth.login, loginDetails),
  sendOtp: async number => await virtualLearn.post(URL.auth.sendOtp, {number}),
  verifyOtp: async (number, otp) =>
    await virtualLearn.post(URL.auth.verifyOtp, {number, otp}),
  register: async (number, fullname, username, email, password) =>
    await virtualLearn.post(URL.auth.register, {
      number,
      fullname,
      username,
      email,
      password,
    }),
  createNewPass: async (number, password) =>
    await virtualLearn.patch(URL.auth.createNewPass, {number, password}),
};
