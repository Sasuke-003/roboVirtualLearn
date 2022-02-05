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
import {colors, fonts, strings} from '../assets';
import {utils} from '../utils';
import PasswordRequirement from '../components/PasswordRequirement';

const VIR_CreateNewPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRequirement, setShowRequirement] = useState(false);
  const {height, width} = useWindowDimensions();
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
  const onResetPress = () => {
    if (isValidPassword(password)) {
      if (confirmPassword === password) {
        console.log('LoginSucss');
      } else {
        utils.showErrorMessage(strings.createNewPassPage.passwdNotMatch);
      }
    } else {
      utils.showErrorMessage(strings.createNewPassPage.passwordError);
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
  confirmPass: {
    // marginTop: 40,
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
