import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Modal from 'react-native-modal';

import {useDispatch, useSelector} from 'react-redux';

import {
  getShowModal,
  setModalVisible,
} from '../redux/reducers/questionAnswerReducer';
import {images, strings, fonts, colors} from '../assets';

import {TouchableOpacity} from 'react-native-gesture-handler';

const ModuleTestSubmitModal = props => {
  const dispatch = useDispatch();
  const showModal = useSelector(getShowModal);

  const onPressSubmit = () => {
    props.updateResult();
    dispatch(setModalVisible(false));
  };
  const onPressCancel = () => {
    dispatch(setModalVisible(false));
  };
  return (
    <Modal
      isVisible={showModal}
      style={styles.modalStyle}
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.5}>
      <View style={styles.container}>
        <View style={styles.upperPart}>
          <Text style={styles.title}>{strings.moduleTest.endTest}</Text>
          <Text style={styles.message}>
            You still have {props.time} remaining
          </Text>
          <Text style={styles.description}>
            {strings.moduleTest.checkAnswer}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.leftPart}>
            <TouchableOpacity onPress={onPressCancel}>
              <View style={styles.cancelContainer}>
                <Text style={styles.cancel}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={onPressSubmit}>
              <View style={styles.cancelContainer}>
                <Text style={styles.cancel}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'snow',
    marginHorizontal: 17,
    borderRadius: 20,
  },
  title: {
    color: colors.primaryText,
    fontFamily: fonts.sFnSDisplayRegular,
    fontWeight: '600',
    fontSize: 19,
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'center',
    paddingTop: 10,
  },
  message: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 13.5,
    letterSpacing: -0.07,
    lineHeight: 17.6,
    textAlign: 'center',
    paddingTop: 17,
    paddingBottom: 5,
  },
  description: {
    color: colors.primaryText,
    fontWeight: '400',
    fontSize: 13.5,
    letterSpacing: -0.19,
    lineHeight: 17.6,
    textAlign: 'center',
    paddingTop: 13,
  },
  upperPart: {
    marginHorizontal: 0,
    padding: 20,
  },
  buttons: {
    borderTopWidth: 0.3,
    borderTopColor: colors.secondaryText,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cancelContainer: {
    paddingHorizontal: 50,
    paddingVertical: 18,
  },
  cancel: {
    fontSize: 18,
    color: 'dodgerblue',
    textAlign: 'center',
  },
  leftPart: {
    borderRightWidth: 0.3,
    borderRightColor: colors.secondaryText,
  },
});
export default ModuleTestSubmitModal;
