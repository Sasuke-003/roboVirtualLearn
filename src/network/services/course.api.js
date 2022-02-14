import {virtualLearn} from '../axiosInstance';
import {store} from '../../redux/store';

import URL from '../url.json';
const config = () => {
  const token = store.getState().userReducer.AuthorizationToken;
  return {headers: {Authorization: token}};
};

export const course = {
  getUserDetails: async () =>
    await virtualLearn.get(URL.course.getUserDetails, config()),
  getAllOffers: async () =>
    await virtualLearn.get(URL.course.getAllOffers, config()),
  getAllCategories: async () =>
    await virtualLearn.get(URL.course.getAllCategories),
  getAllCourses: async () => await virtualLearn.get(URL.course.getAllCourses),
  getTopSearchedCategories: async () =>
    await virtualLearn.get(URL.course.getTopSearchedCategories),
  getAllCoursesFromACategory: async categoryName =>
    await virtualLearn.post(URL.course.getAllCoursesFromACategory, {
      name: categoryName,
    }),
  getTopCoursesFromACategory: async categoryId =>
    await virtualLearn.post(URL.course.getTopCoursesFromACategory, {
      category: categoryId,
    }),
};
