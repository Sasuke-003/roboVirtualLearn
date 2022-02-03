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
    facebookIcon: require('./images/facebook3x.png'),
  },
};
