import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {images, strings, fonts, colors} from '../assets';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NAVIGATION_ROUTES} from '../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {utils} from '../utils';
import {RectangleButton, PasswordRequirement} from '../components';
import {api} from '../network';

const VIR_PersonalDetailsScreen = ({
  route: {
    params: {phoneNumber},
  },
  navigation,
}) => {
  const window = useWindowDimensions();
  const isLandscape = window.height < window.width ? true : false;
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [isRegisterDisabled, setIsRegisterDisabled] = useState(false);

  const onPressRegister = async () => {
    setIsRegisterDisabled(true);
    if (!validate()) {
      setIsRegisterDisabled(false);
      return;
    }
    try {
      const res = await api.user.register(
        '+91' + phoneNumber,
        fullName,
        userName,
        email,
        pass,
      );
      console.warn(res);
      if (res.status === 200) {
        setIsRegisterDisabled(false);
        goToNextScreen();
        return;
      }

      return;
    } catch (error) {
      utils.showErrorMessage(error.response.data.message);
      setIsRegisterDisabled(false);
      return;
    }
  };

  const goToNextScreen = () => {
    navigation.replace(NAVIGATION_ROUTES.SUCCESS_SCREEN, {
      image: images.successScreen.registerSuccess,
      title: strings.registerSuccess.title,
      message: strings.registerSuccess.message,
      buttonName: strings.registerSuccess.buttonName,
      onPressButton: () => {
        navigation.pop(4);
        navigation.navigate(NAVIGATION_ROUTES.DRAWER_NAVIGATOR);
      },
    });
  };

  const validate = () => {
    if (fullName.length < 4) {
      utils.showErrorMessage(
        strings.personalDetailsScreen.fullNameLengthNotValid,
      );
      return false;
    }
    if (userName.length < 4) {
      utils.showErrorMessage(
        strings.personalDetailsScreen.userNameLengthNotValid,
      );
      return false;
    }
    if (!utils.validateUserName(userName)) {
      utils.showErrorMessage(strings.personalDetailsScreen.userNameNotValid);
      return false;
    }
    if (!utils.validateEmail(email)) {
      utils.showErrorMessage(strings.personalDetailsScreen.emailNotValid);
      return false;
    }
    if (!utils.validatePassword(pass)) {
      utils.showErrorMessage(strings.personalDetailsScreen.passwordNotValid);
      return false;
    }
    if (pass !== confirmPass) {
      utils.showErrorMessage(strings.personalDetailsScreen.passwordNotSame);
      return false;
    }
    return true;
  };

  const title = () => (
    <Text style={styles(isLandscape).title}>
      {strings.personalDetailsScreen.title}
    </Text>
  );

  const description = () => (
    <Text style={styles(isLandscape).description}>
      {strings.personalDetailsScreen.description}
    </Text>
  );

  const mobileNumber = () => (
    <View style={styles(isLandscape).mobileNumberContainer}>
      <Text style={styles().mobileNumberLabel}>
        {strings.personalDetailsScreen.mobileNoLabel}
      </Text>
      <Text style={styles(isLandscape).mobileNumber}>+91{phoneNumber}</Text>
    </View>
  );

  const textField = (
    textFieldLabel,
    textFieldValue,
    onTextFieldValueChange,
    secureTextEntry = false,
    infoIconNeeded = false,
  ) => (
    <View
      style={[
        styles(isLandscape).textFieldContainer,
        textFieldValue !== '' && {borderBottomColor: colors.phoneNumberActive},
      ]}>
      <View style={styles().textFieldLabelWrapper}>
        <Text style={styles().textFieldLabel}>
          {textFieldValue.length > 0 && textFieldLabel}
        </Text>
        {textFieldValue.length > 0 && infoIconNeeded && (
          <TouchableOpacity
            onPress={() => setShowPasswordInfo(!showPasswordInfo)}>
            <Image source={images.infoIconGolden} style={styles().infoIcon} />
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        style={[
          styles().textField,
          textFieldValue === '' && {fontFamily: fonts.avenirRegular},
        ]}
        onChangeText={onTextFieldValueChange}
        value={textFieldValue}
        placeholder={textFieldLabel}
        placeholderTextColor={colors.secondaryText}
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        textContentType="oneTimeCode"
        onFocus={() => setShowPasswordInfo(false)}
      />
    </View>
  );

  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles().container}
        scrollEnabled={isLandscape}
        keyboardDismissMode="interactive">
        <KeyboardAwareScrollView
          style={{height: window.height / 1.1}}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          {title()}
          {description()}
          {mobileNumber()}
          {textField(
            strings.personalDetailsScreen.fullNameLabel,
            fullName,
            text => setFullName(text.replace(/[^a-zA-Z ]/g, '')),
          )}
          {textField(
            strings.personalDetailsScreen.userNameLabel,
            userName,
            setUserName,
          )}
          {textField(strings.personalDetailsScreen.emailLabel, email, setEmail)}
          <View style={{position: 'relative'}}>
            {textField(
              strings.personalDetailsScreen.passwordLabel,
              pass,
              setPass,
              true,
              true,
            )}
            {showPasswordInfo && (
              <PasswordRequirement
                position={styles(isLandscape).passwordInfoPosition}
              />
            )}
          </View>

          {textField(
            strings.personalDetailsScreen.confirmPasswordLabel,
            confirmPass,
            setConfirmPass,
            true,
          )}
          <RectangleButton
            name={strings.personalDetailsScreen.registerButtonText}
            btnStyles={styles(isLandscape).button}
            textStyles={styles().buttonText}
            onPress={onPressRegister}
            isDisabled={isRegisterDisabled}
          />
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VIR_PersonalDetailsScreen;

const styles = (isLandscape = false) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      backgroundColor: colors.background,
      height: '100%',
      margin: 5,
    },
    title: {
      color: colors.primaryText,
      fontFamily: fonts.bikoRegular,
      fontSize: 26,
      fontWeight: 'bold',
      marginTop: isLandscape ? '5%' : '20%',
    },
    description: {
      color: colors.secondaryText,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 15,
      lineHeight: 20,
      marginTop: isLandscape ? '1%' : '5%',
    },
    mobileNumberContainer: {
      marginTop: isLandscape ? '2%' : '10%',
      marginBottom: isLandscape ? '0%' : '3%',
    },
    mobileNumberLabel: {
      color: colors.secondaryText,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 14,
      letterSpacing: 0.29,
      lineHeight: 17,
    },
    mobileNumber: {
      color: colors.privacy,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 20,
      letterSpacing: 0.5,
      lineHeight: 24,
      marginTop: isLandscape ? '1%' : '2%',
    },
    textFieldContainer: {
      marginTop: isLandscape ? '2%' : '5%',
      borderBottomWidth: 1,
      borderBottomColor: colors.inputBorderBottomColor,
      paddingBottom: 9,
    },
    textFieldLabelWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    textFieldLabel: {
      color: colors.secondaryText,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 14,
      letterSpacing: 0.29,
      height: 20,
    },
    textField: {
      color: colors.phoneNumberActive,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 16,
      letterSpacing: 0.4,
      lineHeight: 20,
      marginTop: 5,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: colors.buttonBackground,
      height: 46,
      borderRadius: 6,
      marginTop: isLandscape ? '5%' : '20%',
    },
    buttonText: {
      color: colors.buttonText,
      fontFamily: fonts.proximaNovaRegular,
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 20,
    },
    infoIcon: {
      width: 12,
      height: 12,
      marginLeft: 6,
      marginBottom: 2,
    },
    passwordInfoPosition: {
      position: 'absolute',
      bottom: isLandscape ? '-25%' : '-47%',
      zIndex: 2,
    },
  });
