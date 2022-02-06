import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {images, strings, fonts, colors} from '../../assets';
import {useNavigation} from '@react-navigation/core';
import {NAVIGATION_ROUTES} from '../../constants';

const VIR_LoginButton = () => {
  const navigation = useNavigation();
  const onPressForgot = () => {
    navigation.navigate(NAVIGATION_ROUTES.FORGOT_PASSWORD);
  };
  onPressRegister = () => {
    navigation.navigate(NAVIGATION_ROUTES.NEW_ACCOUNT_SCREEN);
  };

  return (
    <View style={styles.buttons}>
      <TouchableOpacity onPress={onPressForgot}>
        <Text style={styles.forgot}>{strings.loginScreen.forgotPassword}</Text>
      </TouchableOpacity>
      <View style={styles.loginButton}>
        <TouchableOpacity>
          <Text style={styles.login}>{strings.loginScreen.login}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerAccount}>
        <TouchableOpacity onPress={onPressRegister}>
          <Text style={styles.noAccount}>
            {strings.loginScreen.noAccount}
            <Text style={[styles.noAccount, styles.register]}>
              {strings.loginScreen.register}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VIR_LoginButton;

const styles = StyleSheet.create({
  buttons: {
    marginBottom: Dimensions.get('window').height < 700 ? 80 : 100,
    justifyContent: 'space-between',
  },
  forgot: {
    color: colors.buttonBackground,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    letterSpacing: 0.29,
    lineHeight: 20,
    textAlign: 'right',
    marginTop: 20,
  },

  loginButton: {
    height: 46,
    width: 327,
    backgroundColor: colors.buttonBackground,
    borderRadius: 6,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  login: {
    color: colors.background,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    letterSpacing: 0.29,
    lineHeight: 20,
    textAlign: 'center',
  },
  registerAccount: {
    marginTop: 30,
  },
  noAccount: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    letterSpacing: 0.29,
    lineHeight: 20,
    textAlign: 'center',
  },

  register: {
    color: colors.buttonBackground,
  },
});
