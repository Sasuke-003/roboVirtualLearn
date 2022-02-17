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
  updateQuestionairProgress: async (
    courseID,
    chapterID,
    questionaireID,
    approvalRate,
    right,
    wrong,
  ) => {
    /*console.log(
      courseID,
      chapterID,
      questionaireID,
      approvalRate,
      right,
      wrong,
    );*/

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
};
