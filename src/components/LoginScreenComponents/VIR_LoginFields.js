import {
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import React, {useState} from 'react';
import {images, strings, fonts, colors} from '../../assets';
import {useDimension} from '../../hooks';
import {useNavigation} from '@react-navigation/core';
import {NAVIGATION_ROUTES} from '../../constants';
import {api} from '../../network';
import {utils} from '../../utils';

const VIR_LoginFields = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginDisabled, setIsLoginDisabled] = useState(false);
  const navigation = useNavigation();
  const {height, width, isPortrait} = useDimension();

  const onPressForgot = () => {
    navigation.navigate(NAVIGATION_ROUTES.FORGOT_PASSWORD);
  };
  const onPressRegister = () => {
    navigation.navigate(NAVIGATION_ROUTES.NEW_ACCOUNT_SCREEN);
  };

  const goToHomeScreen = () => {
    navigation.navigate(NAVIGATION_ROUTES.DRAWER_NAVIGATOR);
  };
  const onPressLogin = () => {
    setIsLoginDisabled(true);
    api.user
      .login({username: username, password: password})
      .then(response => {
        const {
          data: {message, token},
          status,
        } = response;
        setIsLoginDisabled(false);
        if (status === 200) {
          utils.showSuccessMessage(message);
          utils.setAuthToken(token);
          goToHomeScreen();
        }
      })
      .catch(error => {
        utils.showErrorMessage(error.response.data.message);
        setIsLoginDisabled(false);
      });

    console.log('Login Pressed');
  };

  const borderColor =
    username === ''
      ? colors.secondaryText
      : username.length < 5
      ? colors.inputTextWrongBorder
      : colors.inputTextRightBorder;

  const icon =
    username.length < 5
      ? images.loginScreen.textfieldWrongIcon
      : images.loginScreen.textfieldRightIcon;

  const renderFaceBookIcon = () => {
    return (
      <TouchableOpacity style={styles.iconContainer(isPortrait, width)}>
        <Image source={images.loginScreen.facebookIcon} style={styles.fb} />
      </TouchableOpacity>
    );
  };
  const renderGoogleIcon = () => {
    return (
      <TouchableOpacity style={styles.iconContainer(isPortrait, width)}>
        <Image
          source={images.newAccountScreen.googleIcon}
          style={styles.google}
        />
      </TouchableOpacity>
    );
  };

  const renderLoginButton = () => {
    return (
      <View style={styles.buttons}>
        <TouchableOpacity onPress={onPressForgot}>
          <Text style={styles.forgot}>
            {strings.loginScreen.forgotPassword}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressLogin} disabled={isLoginDisabled}>
          <View style={styles.loginButton}>
            {isLoginDisabled ? (
              <ActivityIndicator color={colors.background} />
            ) : (
              <Text style={styles.login}>{strings.loginScreen.login}</Text>
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.registerAccount}>
          <Text style={styles.noAccount}>{strings.loginScreen.noAccount}</Text>
          <TouchableOpacity onPress={onPressRegister}>
            <Text style={[styles.noAccount, styles.register]}>
              {strings.loginScreen.register}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderUsername = () => {
    return (
      <View>
        <Text style={styles.label}>{strings.loginScreen.username}</Text>
        <View
          style={[
            styles.textInputContainer,
            styles.usertextInput,
            {borderColor: borderColor},
          ]}>
          <TextInput
            value={username}
            onChangeText={input => setUsername(input)}
            style={styles.userLabel}
          />
          <View>
            {username !== '' && <Image source={icon} style={styles.icon} />}
          </View>
        </View>
      </View>
    );
  };
  const renderPassword = () => {
    return (
      <View style={[styles.userContainer, styles.passwordContainer]}>
        <Text style={styles.label}>{strings.loginScreen.password}</Text>
        <TextInput
          value={password}
          onChangeText={input => setPassword(input)}
          style={[styles.label, styles.passwordtextInput]}
          secureTextEntry={true}
        />
      </View>
    );
  };
  return (
    <>
      <View style={styles.mainContainer}>
        {renderFaceBookIcon()}
        {renderGoogleIcon()}
      </View>
      <View style={styles.container}>
        {renderUsername()}
        {renderPassword()}
      </View>
      {renderLoginButton()}
    </>
  );
};

export default VIR_LoginFields;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: Dimensions.get('window').height < 700 ? 25 : 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: (isPortrait, width) => ({
    borderColor: 'rgba(119,134,158,0.3)',
    borderWidth: 1,
    borderRadius: 6,
    padding: 20,
    height: 45,
    width: isPortrait ? width / 2.6 : width / 2.5,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  }),

  fb: {
    width: 12,
    height: 22,
  },
  google: {
    width: 20,
    height: 20,
  },
  container: {
    flex: 1,
    marginTop: Dimensions.get('window').height < 700 ? 25 : 40,
  },
  userContainer: {
    width: 327,
    height: 60,
  },
  passwordContainer: {
    marginTop: Dimensions.get('window').height < 700 ? 20 : 30,
    width: '100%',
  },
  userLabel: {
    color: colors.phoneNumberActive,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 18,
    letterSpacing: 0.29,
    lineHeight: 20,
    width: 300,
  },
  label: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 18,
    letterSpacing: 0.29,
    lineHeight: 20,
  },
  passwordtextInput: {
    borderColor: colors.secondaryText,
    borderBottomWidth: 1,
    paddingVertical: Platform.OS === 'ios' ? 10 : null,
    fontSize: 18,
    color: colors.phoneNumberActive,
  },
  usertextInput: {
    borderBottomWidth: 1,
    paddingVertical: Platform.OS === 'ios' ? 10 : null,
    fontSize: 18,
    color: colors.phoneNumberActive,
  },

  icon: {
    width: 20,
    height: 20,
  },

  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
    flexDirection: 'row',
    justifyContent: 'center',
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
