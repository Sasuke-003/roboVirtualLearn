import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getMessageStatus,
  getMessageType,
  getMessage,
  clearError,
} from '../redux/reducers/popupModalReducer';
import Modal from 'react-native-modal';
import {colors, fonts, images} from '../assets';
import {color} from 'react-native-reanimated';

const MessageModal = () => {
  const dispatch = useDispatch();
  const showMessage = useSelector(getMessageStatus);
  const messageType = useSelector(getMessageType);
  const message = useSelector(getMessage);
  const clearErrorMessage = () => {
    dispatch(clearError());
  };
  return (
    <Modal
      isVisible={showMessage}
      style={styles.modalStyle}
      backdropOpacity={0}
      onBackButtonPress={clearErrorMessage}>
      <View
        style={[
          styles.container,
          messageType === 'success' && {
            backgroundColor: colors.inputTextRightBorder,
          },
        ]}>
        {messageType === 'error' ? (
          <Image source={images.errorIcon} style={styles.icon} />
        ) : (
          <Icon name="ios-checkmark-circle" style={styles.ionIcon} />
        )}

        <Text style={styles.text}>{message}</Text>
      </View>
    </Modal>
  );
};

export default MessageModal;

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    padding: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.errorColor,
    height: '10%',
    justifyContent: 'flex-end',
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
    width: '80%',
  },
  icon: {
    marginRight: 0,
    height: '30%',
    // width: 20,
    resizeMode: 'contain',
  },
  ionIcon: {
    fontSize: 30,
    marginRight: 10,
    color: colors.background,
  },
});
