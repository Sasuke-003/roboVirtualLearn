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
  newAccountScreen: {
    googleIcon: require('./images/googleIcon3x.png'),
  },
  loginScreen: {
    facebookIcon: require('./images/facebookIcon3x.png'),
    textfieldRightIcon: require('./images/icon_textfield_right.png'),
    textfieldWrongIcon: require('./images/icon_textfield_wrong.png'),
  },
  successScreen: {
    registerSuccess: require('./images/img_Register_success.png'),
  },
};
