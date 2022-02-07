import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {images, strings, fonts, colors} from '../assets';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NAVIGATION_ROUTES} from '../constants';
import {api} from '../network';

import {utils} from '../utils';

const facebookAndGoogleLogin = () => (
  <View style={[styles().fbGoogleContainer]}>
    <TouchableOpacity style={styles().fbGoogleTouchableContainer}>
      <View style={styles().fbGoogleButton}>
        <Image
          source={images.newAccountScreen.googleIcon}
          style={styles().logo}
        />
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles().fbGoogleTouchableContainer}>
      <View style={styles().fbGoogleButton}>
        <Image
          source={images.newAccountScreen.facebookIcon}
          style={styles().logo}
        />
      </View>
    </TouchableOpacity>
  </View>
);

const VIR_NewAccountScreen = ({navigation}) => {
  const window = useWindowDimensions();
  const isLandscape = window.height < window.width ? true : false;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const onChangeText = text => {
    setPhoneNumber(text.replace(/[^0-9]/g, ''));
  };

  const sendOtp = async () => {
    setIsButtonDisabled(true);
    if (phoneNumber.length < 10) {
      utils.showErrorMessage(strings.newAccountPage.phoneNumberError);
      return;
    }
    try {
      const {status} = await api.user.sendOtp('+91' + phoneNumber);
      utils.showSuccessMessage(strings.newAccountPage.codeSent + phoneNumber);
      setIsButtonDisabled(false);
      if (status === 200) goToVerifyScreen();
      return;
    } catch (error) {
      utils.showErrorMessage(error.response.data.message);
      setIsButtonDisabled(false);
      return;
    }
  };

  const goToVerifyScreen = () => {
    navigation.navigate(NAVIGATION_ROUTES.VERIFY_ACCOUNT_SCREEN, {
      afterVerifyGoto: NAVIGATION_ROUTES.PERSONAL_DETAILS_SCREEN,
      phoneNumber,
    });
  };
  const goToLoginScreen = () => {
    navigation.navigate(NAVIGATION_ROUTES.LOGIN_SCREEN);
  };

  const title = () => (
    <Text style={styles(isLandscape).title}>
      {strings.newAccountPage.title}
    </Text>
  );

  const description = () => (
    <Text style={styles(isLandscape).description}>
      {strings.newAccountPage.description}
    </Text>
  );

  const phoneInput = () => (
    <>
      <Text style={styles().phonNumberLabel}>
        {phoneNumber.length > 0 && strings.newAccountPage.phoneNumberLabelText}
      </Text>
      <View
        style={[
          styles(isLandscape).inputContainer,
          isInputActive && {
            borderBottomColor: colors.phoneNumberActive,
          },
        ]}>
        <Text style={styles().countryCode}>+91</Text>
        <TextInput
          keyboardType="numeric"
          maxLength={10}
          style={styles().input}
          onChangeText={onChangeText}
          value={phoneNumber}
          placeholder={strings.newAccountPage.phoneInputHelperText}
          onFocus={() => setIsInputActive(true)}
          onBlur={() => setIsInputActive(false)}
        />
      </View>
    </>
  );

  const button = () => (
    <TouchableOpacity onPress={sendOtp} disabled={isButtonDisabled}>
      <View style={styles(isLandscape).button}>
        {isButtonDisabled ? (
          <ActivityIndicator color={colors.background} />
        ) : (
          <Text style={styles().buttonText}>
            {strings.newAccountPage.buttonText}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const loginButton = () => (
    <View style={styles(isLandscape).loginButtonContainer}>
      <Text style={styles().haveAccountText}>
        {strings.newAccountPage.haveAccountText}
      </Text>
      <TouchableOpacity onPress={goToLoginScreen}>
        <Text style={styles().loginButton}>
          {strings.newAccountPage.loginText}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles().container}
        scrollEnabled={isLandscape}>
        <View
          style={{
            // height: !isLandscape ? window.height - 90 : window.height - 30,
            height: Platform.OS === 'ios' ? window.height - 60 : window.height,
            justifyContent: 'space-between',
          }}>
          <View style={styles(isLandscape).newAccountContainer}>
            {title()}
            {description()}
            {phoneInput()}
            {button()}
            {loginButton()}
          </View>
          {facebookAndGoogleLogin()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VIR_NewAccountScreen;

const styles = (isLandscape = false) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      backgroundColor: colors.background,
      height: '100%',
      margin: 5,
    },
    newAccountContainer: {
      marginTop: isLandscape ? '5%' : '30%',
      flex: 20,
    },
    title: {
      color: colors.primaryText,
      fontFamily: fonts.bikoRegular,
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: isLandscape ? '1%' : '4%',
    },
    description: {
      color: colors.secondaryText,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 15,
      lineHeight: 20,
      marginBottom: isLandscape ? '5%' : '16%',
    },
    phonNumberLabel: {
      color: colors.secondaryText,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 14,
      letterSpacing: 0.29,
      // lineHeight: 17,
      height: 20,
      // marginBottom: '1%',
    },
    inputContainer: {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.inputBorderBottomColor,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: isLandscape ? '5%' : '15%',
    },
    countryCode: {
      color: colors.phoneNumberActive,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 16,
      letterSpacing: 0.4,
      lineHeight: 20,
      marginRight: 18,
    },
    input: {
      width: '80%',
      color: colors.phoneNumberActive,
      fontFamily: fonts.avenirRegular,
      fontSize: 16,
      letterSpacing: 0.4,
      lineHeight: 22,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.buttonBackground,
      height: 46,
      borderRadius: 6,
      marginBottom: isLandscape ? '2%' : '7%',
    },
    buttonText: {
      color: colors.buttonText,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 20,
    },
    loginButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    haveAccountText: {
      color: colors.secondaryText,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 15,
    },
    loginButton: {
      color: colors.buttonBackground,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 15,
      fontWeight: 'bold',
    },
    fbGoogleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // position: 'absolute',
      // alignSelf: 'center',
      // bottom: '5%',
      flex: 2,
    },
    fbGoogleTouchableContainer: {
      width: '47%',
    },
    fbGoogleButton: {
      borderWidth: 1.5,
      height: 41,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.googleButtonBorder,
      borderRadius: 6,
    },
    logo: {
      height: 20,
      resizeMode: 'contain',
    },
  });
