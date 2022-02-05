import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {images, strings, fonts, colors} from '../../assets';

const VIR_TextInput = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

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
    <View style={styles.container}>
      {renderUsername()}
      {renderPassword()}
    </View>
  );
};

export default VIR_TextInput;

const styles = StyleSheet.create({
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
  },
});
