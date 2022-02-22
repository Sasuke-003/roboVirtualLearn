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

  getNotification: async () => {
    return await virtualLearn.get(URL.notification.getNotification, config());
  },
  setNotifications: async () => {
    return await virtualLearn.post(
      URL.notification.setNotification,
      {},
      config(),
    );
  },

  getFilteredSearch: async (category, chapter) => {
    return await virtualLearn.post(URL.course.getSearchFilter, {
      category,
      chapter,
    });
  },
  getTopSearch: async () => {
    return await virtualLearn.get(URL.course.getTopSearches);
  },
  getEnrolledCourses: async () => {
    return await virtualLearn.get(URL.course.getEnrolledCourses, config());
  },
  updateQuestionairProgress: async (
    courseID,
    chapterID,
    questionaireID,
    approvalRate,
    right,
    wrong,
  ) => {
    return await virtualLearn.post(
      URL.course.updateQuestionaireProgress,
      {
        courseID: courseID,
        chapterID: chapterID,
        questionaireID: questionaireID,
        approvalRate: approvalRate,
        right: right,
        wrong: wrong,
      },
      config(),
    );
  },
  getCourseDetails: async id =>
    await virtualLearn.post(URL.course.getCourseDetails, {id}, config()),

  enroll: async courseID => {
    return await virtualLearn.post(URL.course.enroll, {courseID}, config());
  },
  getCourseProgress: async courseID => {
    return await virtualLearn.post(
      URL.course.getCourseProgress,
      {courseID},
      config(),
    );
  },
};
