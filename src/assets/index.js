import {Platform} from 'react-native';
export {colors} from './colors';
export {default as strings} from './languages/en';
export const fonts = {
  bikoRegular: Platform.OS === 'ios' ? 'biko' : 'biko-regular',
  bikoBold: Platform.OS === 'ios' ? 'biko-bold' : 'biko-regular',
  BikoBold: 'Biko-Bold',
  proximaNovaMedium: 'Montserrat-Medium',
  proximaNovaRegular: 'Montserrat-Regular',
  proximaNovaBlack: 'Montserrat-Black',
  proximaNovaBold: 'Montserrat-Bold',
  proximaNovaLight: 'Montserrat-Light',
  avenirRegular: 'NunitoSans-Regular',
  avenirBlack: 'NunitoSans-Black',
  avenirBold: 'NunitoSans-Bold',
  avenirLight: 'NunitoSans-Light',
  sFnSDisplayRegular: 'Cabin-Regular',
  sFnSDisplayBold: 'Cabin-Bold',
  sFnSDisplayMedium: 'Cabin-Medium',
};
export const images = {
  errorIcon: require('./images/errorIcon3x.png'),
  infoIconGolden: require('./images/infoIconGolden3x.png'),
  homeIcon: require('./images/homeIcon3x.png'),
  myCourseIcon: require('./images/myCourseIcon3x.png'),
  notificationIcon: require('./images/notificationIcon3x.png'),
  profileIcon: require('./images/profileIcon3x.png'),
  homeIcon: require('./images/logoutIcon3x.png'),
  hamburgerMenuIcon: require('./images/hamburgerMenuIcon3x.png'),
  searchIcon: require('./images/searchIcon3x.png'),
  playButton: require('./images/playButton3x.png'),
  dropdown: require('./images/dropdown3x.png'),
  closeIcon: require('./images/closeIcon3x.png'),
  newAccountScreen: {
    googleIcon: require('./images/googleIcon3x.png'),
    facebookIcon: require('./images/facebook3x.png'),
  },
  verifyAccountScreen: {
    backIcon: require('./images/backIcon3x.png'),
  },
  onboardScreen: {
    onboardLogo: require('./images/onboarding/logo3x.png'),
    illustrationFirst: require('./images/onboarding/illustrationFirst3x.png'),
    illustrationSecond: require('./images/onboarding/illustrationSecond3x.png'),
    illustrationThird: require('./images/onboarding/illustrationThird3x.png'),
    nxtBtn: require('./images/onboarding/btn_next3x.png'),
    doneBtn: require('./images/onboarding/btn_done3x.png'),
  },
  landingScreen: {
    landing: require('./images/landingPage/landing3x.png'),
  },
  loginScreen: {
    facebookIcon: require('./images/facebookIcon3x.png'),
    textfieldRightIcon: require('./images/icon_textfield_right.png'),
    textfieldWrongIcon: require('./images/icon_textfield_wrong.png'),
  },
  successScreen: {
    registerSuccess: require('./images/img_Register_success.png'),
    passwordChangeSuccess: require('./images/password_change_sucess3x.png'),
  },
  profileScreen: {
    profileBg: require('./images/profilepic3x.png'),
    editIcon: require('./images/editIcon3x.png'),
    forwardIcon: require('./images/forwardIcon3x.png'),
    privacyIcon: require('./images/privacyIcon3x.png'),
    blankImage: require('./images/blankProfile.png'),
    hamburgerMenuIconWhite: require('./images/hamburgermenu_white3x.png'),
    uploadProfilePic: require('./images/uploadProfilePic3x.png'),
  },
  searchScreen: {
    backIcon: require('./images/backIcon3x.png'),
    searchIcon: require('./images/searchCourse.png'),
    filterSearch: require('./images/filterSearch.png'),
    noSearchResult: require('./images/noSearchResult.png'),
    modalClose: require('./images/modalClose.png'),
  },
  settings: {
    notification: require('./images/notificationSettingsIcon3x.png'),
    privacy: require('./images/privacyIcon.png'),
    terms: require('./images/termsIcon.png'),
  },
  myCourses: {
    CourseEmpty: require('./images/my_course_empty.png'),
    CourseCompleted: require('./images/CourseCompleted.png'),
    CourseOngoing: require('./images/CourseOngoing.png'),
  },
  result: {
    closeIcon: require('./images/icn_close_white3x.png'),
    showAns: require('./images/icn_show_answer3x.png'),
    checked: require('./images/icn_optionChecked3x.png'),
    wrongAns: require('./images/icn_optionWrong3x.png'),
    closeModal: require('./images/icn_close_showAnswer3x.png'),
  },
};
