import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {images, strings, fonts, colors} from '../assets';
import {NAVIGATION_ROUTES} from '../constants';
import {utils} from '../utils';
import {api} from '../network';

const VIR_VerifyAccountScreen = ({
  route: {
    params: {afterVerifyGoto, phoneNumber},
  },
  navigation,
}) => {
  const window = useWindowDimensions();
  const [otp, setOtp] = useState('');
  const [isError, setIsError] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isVerifyDisabled, setIsVerifyDisabled] = useState(false);
  const isLandscape = window.height < window.width ? true : false;
  const titleText =
    afterVerifyGoto === NAVIGATION_ROUTES.PERSONNEL_DETAILS_SCREEN
      ? strings.verifyAccountPage.title1
      : strings.verifyAccountPage.title2;
  const ButtonText =
    afterVerifyGoto === NAVIGATION_ROUTES.PERSONNEL_DETAILS_SCREEN
      ? strings.verifyAccountPage.buttonText1
      : strings.verifyAccountPage.buttonText2;
  const title = () => (
    <Text style={styles(isLandscape).title}>{titleText}</Text>
  );

  useEffect(() => {
    const backAction = () => {
      onBackClick();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);
  }, []);

  const sendOtp = async () => {
    try {
      await api.user.sendOtp('+91' + phoneNumber);
      utils.showSuccessMessage(strings.newAccountPage.codeSent + phoneNumber);
      return true;
    } catch (error) {
      utils.showErrorMessage(error.response.data.message);
      return false;
    }
  };

  const verifyOtp = async () => {
    setIsVerifyDisabled(true);
    try {
      const {status} = await api.user.verifyOtp('+91' + phoneNumber, otp);
      utils.showSuccessMessage(strings.verifyAccountPage.codeVerified);
      setIsVerifyDisabled(false);
      if (status === 200) gotoNextScreen();
      return;
    } catch (error) {
      utils.showErrorMessage(error.response.data.message);
      setIsVerifyDisabled(false);
      setIsError(true);
      return;
    }
  };

  onClickResend = () => {
    if (!sendOtp()) return;
    setIsResendDisabled(true);
    setTimeout(() => {
      setIsResendDisabled(false);
    }, 10000);
  };

  const onBackClick = () => {
    Alert.alert(
      '',
      'Verification in progress! Are you sure you want go back?',
      [
        {text: 'No', style: 'No', onPress: () => {}},
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => navigation.pop(),
        },
      ],
    );
  };

  const onClickVerify = () => {
    if (otp.length < 4) {
      setIsError(true);
      utils.showErrorMessage(strings.verifyAccountPage.codeLengthNotValid);
      return;
    }
    verifyOtp();
  };

  const gotoNextScreen = () => {
    navigation.replace(afterVerifyGoto, {phoneNumber});
  };

  const description = () => (
    <Text style={styles(isLandscape).description}>
      {strings.verifyAccountPage.description}
    </Text>
  );

  const dRCAndResend = () => (
    <View style={styles(isLandscape).dRCAndResendContainer}>
      <Text style={styles().didNotReceiveCode}>
        {strings.verifyAccountPage.didNotReceiveCode}
      </Text>
      <TouchableOpacity
        onPress={() => onClickResend()}
        disabled={isResendDisabled}>
        <Text
          style={[
            styles(isLandscape).resendButton,
            isResendDisabled && {color: colors.inputBorderBottomColor},
          ]}>
          {strings.verifyAccountPage.resend}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const button = () => (
    <TouchableOpacity onPress={onClickVerify} disabled={isVerifyDisabled}>
      <View style={styles(isLandscape).button}>
        {isVerifyDisabled ? (
          <ActivityIndicator color={colors.background} />
        ) : (
          <Text style={styles().buttonText}>{ButtonText}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const otpInput = () => (
    <OTPInputView
      style={styles(isLandscape).otpContainer}
      pinCount={4}
      code={otp}
      onCodeChanged={code => {
        setOtp(code);
        setIsError(false);
      }}
      codeInputFieldStyle={[
        styles().underlineStyleBase,
        otp.length === 4 && {
          borderColor: colors.successColor,
          borderBottomWidth: 2,
        },
        isError && {borderColor: colors.errorColor, borderBottomWidth: 2},
      ]}
      codeInputHighlightStyle={[
        styles().underlineStyleHighLighted,
        otp.length === 4 && {
          borderColor: colors.successColor,
          borderBottomWidth: 2,
        },
        isError && {borderColor: colors.errorColor, borderBottomWidth: 2},
      ]}
      keyboardType="numeric"
    />
  );

  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles().container}
        scrollEnabled={isLandscape}>
        <TouchableOpacity onPress={onBackClick}>
          <Image
            source={images.verifyAccountScreen.backIcon}
            style={styles(isLandscape).backLogo}
          />
        </TouchableOpacity>
        {title()}
        {description()}
        {otpInput()}
        {dRCAndResend()}
        {button()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VIR_VerifyAccountScreen;

const styles = (isLandscape = false) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      backgroundColor: colors.background,
      height: '100%',
      margin: 5,
    },
    backLogo: {
      marginTop: isLandscape ? '1%' : '5%',
      width: 26,
      resizeMode: 'contain',
    },
    title: {
      color: colors.primaryText,
      fontFamily: fonts.bikoRegular,
      fontSize: 26,
      fontWeight: 'bold',
      marginTop: isLandscape ? '1%' : '4%',
    },
    description: {
      color: colors.secondaryText,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 15,
      lineHeight: 20,
      marginTop: isLandscape ? '2%' : '3%',
    },
    dRCAndResendContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      marginTop: isLandscape ? '5%' : '10%',
    },
    didNotReceiveCode: {
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 16,
      letterSpacing: 0.4,
      color: colors.secondaryText,
    },
    resendButton: {
      marginTop: isLandscape ? '1%' : '3%',
      fontFamily: fonts.proximaNovaBold,
      fontSize: 16,
      letterSpacing: 0.4,
      color: colors.buttonBackground,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.buttonBackground,
      height: 46,
      borderRadius: 6,
      marginTop: isLandscape ? '5%' : '23%',
      width: isLandscape ? '50%' : '100%',
      alignSelf: 'center',
    },
    buttonText: {
      color: colors.buttonText,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 20,
    },
    otpContainer: {
      width: isLandscape ? '40%' : '65%',
      height: 50,
      alignSelf: 'center',
      marginTop: isLandscape ? '3%' : '15%',
    },
    borderStyleBase: {
      width: 30,
      height: 45,
    },

    borderStyleHighLighted: {
      borderColor: '#03DAC6',
    },

    underlineStyleBase: {
      width: 40,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderColor: colors.secondaryText,
      color: colors.phoneNumberActive,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 20,
      fontWeight: '600',
      borderRadius: 0,
    },

    underlineStyleHighLighted: {
      borderColor: colors.phoneNumberActive,
    },
  });
