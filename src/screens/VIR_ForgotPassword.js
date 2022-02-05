import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {images, strings, fonts, colors} from '../assets';
import {NAVIGATION_ROUTES} from '../constants';
Icon.loadFont().then();

const VIR_ForgotPassword = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const borderColor =
    phoneNumber === ''
      ? colors.secondaryText
      : phoneNumber.length < 10
      ? colors.inputTextWrongBorder
      : colors.inputTextRightBorder;

  const icon =
    phoneNumber.length < 10
      ? images.loginScreen.textfieldWrongIcon
      : images.loginScreen.textfieldRightIcon;
  const mobileCheck = phone => {
    return setPhoneNumber((phone = isNaN(phone) ? '' : phone));
  };
  const onPressBack = () => {
    navigation.navigate(NAVIGATION_ROUTES.LOGIN_SCREEN);
  };
  const renderIcon = () => {
    return (
      <View>
        <TouchableOpacity onPress={onPressBack}>
          <Icon
            name="md-arrow-back-sharp"
            size={40}
            color={colors.primaryText}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderText = () => {
    return (
      <View style={styles.heading}>
        <Text style={styles.title}>{strings.forgotPasswordScreen.title}</Text>
        <Text style={styles.description}>
          {strings.forgotPasswordScreen.description}
        </Text>
      </View>
    );
  };
  const renderTextInput = () => {
    return (
      <View style={[styles.inputContainer, {borderColor: borderColor}]}>
        <Text style={styles.prefix}>+91</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={input => mobileCheck(input)}
          maxLength={10}
          keyboardType="numeric"
          placeholder={strings.forgotPasswordScreen.placeholder}
          placeholderTextColor={colors.secondaryText}
          style={[styles.prefix, styles.input]}
        />
        {phoneNumber !== '' && <Image source={icon} style={styles.icon} />}
      </View>
    );
  };
  const renderButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text style={styles.send}>{strings.forgotPasswordScreen.send}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderError = () => {
    return (
      <View style={styles.errorView}>
        <View style={styles.exclamation}>
          <Text style={styles.symbol}>!</Text>
        </View>
        <Text style={styles.errorMessage}>
          {strings.forgotPasswordScreen.invalidPhoneNumber}
        </Text>
      </View>
    );
  };
  const renderTextMobile = () => {
    return (
      <View>
        <Text style={styles.mobileNumber}>
          {strings.forgotPasswordScreen.mobileNumber}
        </Text>
      </View>
    );
  };
  return (
    <>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          {renderIcon()}
          {renderText()}
          {renderTextMobile()}
          {renderTextInput()}
          {renderButton()}
        </View>
      </ScrollView>
      <View>
        {phoneNumber.length < 10 && phoneNumber !== '' && renderError()}
      </View>
    </>
  );
};

export default VIR_ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Dimensions.get('window').height < 700 ? 50 : 70,
    paddingHorizontal: Dimensions.get('window').width < 450 ? 25 : 40,
  },

  title: {
    color: colors.primaryText,
    fontFamily: fonts.BikoBold,
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 35,
    paddingBottom: 15,
  },
  heading: {
    paddingTop: 15,
  },
  description: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 25,
  },
  inputContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.secondaryText,
    borderBottomWidth: 1,
    paddingVertical: Platform.OS === 'ios' ? 15 : null,

    color: colors.phoneNumberActive,
  },
  prefix: {
    color: colors.phoneNumberActive,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 18,
    letterSpacing: 0.4,
    lineHeight: 18,
    paddingRight: 18,
  },
  input: {
    width: 270,
    fontSize: 18,
    lineHeight: 20,
  },
  mobileNumber: {
    marginTop: 40,
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 17,
    letterSpacing: 0.29,
    lineHeight: 17,
  },
  buttonContainer: {
    height: 46,
    width: 327,
    backgroundColor: colors.buttonBackground,
    borderRadius: 6,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  send: {
    color: colors.background,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    letterSpacing: 0.29,
    lineHeight: 20,
    textAlign: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  errorView: {
    flexDirection: 'row',
    height: 54,
    width: '100%',
    backgroundColor: colors.inputTextWrongBorder,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  errorMessage: {
    color: colors.background,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 16,
    letterSpacing: 0.4,
    lineHeight: 20,
    paddingLeft: 10,
  },
  exclamation: {
    height: 25,
    width: 25,
    backgroundColor: colors.background,

    borderRadius: 12.5,
  },
  symbol: {
    color: colors.inputTextWrongBorder,
    fontSize: 18,
    textAlign: 'center',
  },
});