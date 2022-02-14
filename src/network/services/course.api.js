import {virtualLearn} from '../axiosInstance';
import {store} from '../../redux/store';

import URL from '../url.json';
const config = () => {
  const token = store.getState().userReducer.AuthorizationToken;
  return {headers: {Authorization: token}};
};

export const course = {
  getUserDetails: async () => {
    return await virtualLearn.get(URL.course.getUserDetails, config());
  },
  getAllCategories: async () => {
    return await virtualLearn.get(URL.course.getAllCategories);
  },
  getAllCourses: async () => {
    return await virtualLearn.get(URL.course.getAllCourses);
  },
  getFilteredSearch: async (category, chapters) => {
    return await virtualLearn.post(URL.course.getSearchFilter, {
      category,
      chapters,
    });
  },
  getTopSearch: async () => {
    return await virtualLearn.get(URL.course.getTopSearches);
  },
  getEnrolledCourses: async () => {
    return await virtualLearn.get(URL.course.getEnrolledCourses, config());
  },
};
