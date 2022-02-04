import {Platform} from 'react-native';
export {colors} from './colors';
export {default as strings} from './languages/en';
export const fonts = {
  bikoRegular: Platform.OS === 'ios' ? 'biko' : 'biko-regular',
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
  newAccountScreen: {
    googleIcon: require('./images/googleIcon3x.png'),
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
};
