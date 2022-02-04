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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {images, strings, fonts, colors} from '../assets';
import {NAVIGATION_ROUTES} from '../constants';
import {utils} from '../utils';

const OTP = '1234';

const VIR_VerifyAccountScreen = ({
  route: {
    params: {afterVerifyGoto, phoneNumber},
  },
  navigation,
}) => {
  const window = useWindowDimensions();
  const [otp, setOtp] = useState('');
  const [isError, setIsError] = useState(false);
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
    if (otp !== OTP) {
      setIsError(true);
      utils.showErrorMessage(strings.verifyAccountPage.codeNotValid);
      return;
    }
    gotoNextScreen();
  };

  const gotoNextScreen = () => {
    navigation.navigate(afterVerifyGoto, {phoneNumber});
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
      <TouchableOpacity>
        <Text style={styles(isLandscape).resendButton}>
          {strings.verifyAccountPage.resend}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const button = () => (
    <TouchableOpacity onPress={onClickVerify}>
      <View style={styles(isLandscape).button}>
        <Text style={styles().buttonText}>{ButtonText}</Text>
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
      autoFocusOnLoad
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
