import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getErrorStatus,
  getErrorMessage,
  clearError,
} from '../redux/reducers/errorModalReducer';
import Modal from 'react-native-modal';
import {colors, fonts, images} from '../assets';

const ErrorModal = () => {
  const dispatch = useDispatch();
  const isError = useSelector(getErrorStatus);
  const errorMessage = useSelector(getErrorMessage);
  const clearErrorMessage = () => {
    dispatch(clearError());
  };
  return (
    <Modal
      isVisible={isError}
      style={styles.modalStyle}
      backdropOpacity={0}
      onBackButtonPress={clearErrorMessage}>
      <View style={styles.container}>
        <Image source={images.errorIcon} style={styles.icon} />
        <Text style={styles.text}>{errorMessage}</Text>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    padding: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.errorColor,
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: fonts.proximaNovaRegular,
    fontWeight: '500',
    color: colors.buttonText,
    fontSize: 16,
    letterSpacing: 0.4,
    lineHeight: 20,
  },
  icon: {
    marginRight: 10,
    // height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
