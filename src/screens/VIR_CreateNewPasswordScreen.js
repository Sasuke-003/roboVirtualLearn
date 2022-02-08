import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import RectangleButton from '../components/Buttons/RectangleButton';
import {colors, fonts, strings, images} from '../assets';
import {utils} from '../utils';
import PasswordRequirement from '../components/PasswordRequirement';
import {NAVIGATION_ROUTES} from '../constants';
import {api} from '../network';

const VIR_CreateNewPasswordScreen = ({
  navigation,
  route: {
    params: {phoneNumber},
  },
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRequirement, setShowRequirement] = useState(false);
  const {height, width} = useWindowDimensions();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const portrait = height > width;

  const onChangePassword = text => {
    setPassword(text);
    if (isValidPassword(text)) {
      setShowRequirement(false);
    } else {
      setShowRequirement(true);
    }
  };
  const onChangeConfirmPass = text => {
    setConfirmPassword(text);
  };
  const isValidPassword = password => {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&#]{6,}$/.test(password)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const goToSuccessScreen = () => {
    navigation.replace(NAVIGATION_ROUTES.SUCCESS_SCREEN, {
      image: images.successScreen.passwordChangeSuccess,
      title: strings.passwordChangeSuccess.title,
      message: strings.passwordChangeSuccess.message,
      buttonName: strings.passwordChangeSuccess.buttonName,
      onPressButton: () => {
        navigation.pop(2);
      },
    });
  };

  const onResetPress = async () => {
    setIsButtonDisabled(true);
    if (isValidPassword(password)) {
      if (confirmPassword === password) {
        try {
          const {status} = await api.user.createNewPass(
            '+91' + phoneNumber,
            password,
          );
          setIsButtonDisabled(false);
          if (status === 200) goToSuccessScreen();
        } catch (error) {
          utils.showErrorMessage(error.response.data.message);
          setIsButtonDisabled(false);
        }
      } else {
        utils.showErrorMessage(strings.createNewPassPage.passwdNotMatch);
        setIsButtonDisabled(false);
      }
    } else {
      utils.showErrorMessage(strings.createNewPassPage.passwordError);
      setIsButtonDisabled(false);
    }
  };

  const renderTitleView = () => {
    return (
      <View style={styles.titleContainer(height)}>
        <Text style={styles.title}>{strings.createNewPassPage.title}</Text>
        <Text style={styles.discription}>
          {strings.createNewPassPage.description}
        </Text>
      </View>
    );
  };
  const renderPasswordSection = () => {
    return (
      <>
        <Text style={styles.passLabel}>
          {password.length > 0 && strings.createNewPassPage.plaaceholder1}
        </Text>
        <TextInput
          style={[styles.passInput, password.length > 0 && styles.inputActive]}
          onChangeText={onChangePassword}
          value={password}
          placeholder={strings.createNewPassPage.plaaceholder1}
          secureTextEntry={true}
        />
      </>
    );
  };
  const renderConfirmPasswordSection = () => {
    return (
      <>
        <Text
          style={[
            styles.confirmLabel,
            confirmPassword.length > 0 && {marginTop: 40},
          ]}>
          {confirmPassword.length > 0 &&
            strings.createNewPassPage.plaaceholder2}
        </Text>
        <TextInput
          style={[
            styles.passInput,
            styles.confirmPass,
            confirmPassword.length > 0 && styles.inputActive,
          ]}
          onChangeText={onChangeConfirmPass}
          value={confirmPassword}
          placeholder={strings.createNewPassPage.plaaceholder2}
          secureTextEntry={true}
        />
      </>
    );
  };
  const renderPasswordView = () => {
    return (
      <View style={styles.passwordContainer(portrait)}>
        {renderPasswordSection()}
        {password.length > 0 && showRequirement ? (
          <PasswordRequirement position={styles.reqPosition} />
        ) : null}
        {renderConfirmPasswordSection()}
      </View>
    );
  };

  const renderPortrait = () => {
    return (
      <>
        {renderTitleView()}
        {renderPasswordView()}
        <RectangleButton
          onPress={onResetPress}
          name={strings.createNewPassPage.resetBtn}
          btnStyles={styles.btnStyles}
          textStyles={styles.textStyles}
          disabled={isButtonDisabled}
        />
      </>
    );
  };
  const renderLandscape = () => {
    return (
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {renderPortrait()}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {portrait ? renderPortrait() : renderLandscape()}
    </SafeAreaView>
  );
};

export default VIR_CreateNewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
  titleContainer: height => ({
    marginTop: height / 13,
  }),
  btnStyles: {
    backgroundColor: colors.primary,
    width: '100%',
  },
  textStyles: {
    color: colors.background,
    fontFamily: fonts.proximaNovaBlack,
  },
  title: {
    color: colors.primaryText,
    fontFamily: fonts.bikoRegular,
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 35,
    marginBottom: 10,
  },
  discription: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 15,
    lineHeight: 20,
  },
  passwordContainer: portrait => ({
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: portrait ? 55 : 30,
    marginBottom: portrait ? '27%' : '5%',
  }),
  passInput: {
    color: colors.secondaryText,
    fontFamily: fonts.avenirRegular,
    fontSize: 16,
    letterSpacing: 0.4,
    lineHeight: 22,
    borderBottomWidth: 0.5,
    borderColor: colors.inputBorderBottomColor,
    height: 31,
    paddingBottom: 5,
    width: '100%',
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  inputActive: {
    color: colors.phoneNumberActive,
    borderColor: colors.phoneNumberActive,
  },
  reqPosition: {
    position: 'absolute',
    top: 60,
    zIndex: 2,
  },
  passLabel: {
    alignSelf: 'flex-start',
    marginBottom: 7,
    height: 20,
    fontSize: 14,
    letterSpacing: 0.29,
    lineHeight: 17,
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
  },
  confirmLabel: {
    alignSelf: 'flex-start',
    marginBottom: 7,
    marginTop: 20,
    height: 15,
    fontSize: 14,
    letterSpacing: 0.29,
    lineHeight: 17,
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
  },
});
