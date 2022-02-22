import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {colors, fonts, images, strings} from '../assets';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';

const ResultModal = ({showModal, setShowModal, data, setModalData}) => {
  const {height, width} = useWindowDimensions();
  const portrait = height > width;

  const onCancel = () => {
    setShowModal(false);
    setModalData(null);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerView}>
        <Text style={styles.title}>
          {strings.ResultScreen.qsn}
          {data?.order}
        </Text>
        <TouchableOpacity onPress={onCancel}>
          <Image source={images.result.closeModal} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderAnwerCorrectCase = (item, index) => {
    return (
      <View
        style={[styles.option, item === data?.userAnswer && styles.correct]}
        key={index}>
        {item === data?.userAnswer ? (
          <Image source={images.result.checked} style={styles.checked} />
        ) : (
          <View style={styles.optionButton}></View>
        )}
        <Text
          style={[
            styles.optionText,
            item === data?.userAnswer && styles.textChange,
          ]}>
          {item}
        </Text>
      </View>
    );
  };

  const renderAnwerWrongCase = (item, index) => {
    return (
      <View
        style={[
          styles.option,
          item === data?.answer && styles.correct,
          item === data?.userAnswer && styles.wrong,
        ]}
        key={index}>
        {item === data?.answer ? (
          <Image source={images.result.checked} style={styles.checked} />
        ) : item === data?.userAnswer ? (
          <Image source={images.result.wrongAns} style={styles.checked} />
        ) : (
          <View style={styles.optionButton}></View>
        )}
        <Text
          style={[
            styles.optionText,
            item === data?.answer || item === data?.userAnswer
              ? styles.textChange
              : null,
          ]}>
          {item}
        </Text>
      </View>
    );
  };

  const renderAnswerType = () => {
    return (
      <Text style={[styles.answer, data?.type === 'Wrong' && styles.wrongText]}>
        {data.type === 'Correct'
          ? strings.ResultScreen.correctOption
          : strings.ResultScreen.wrongOption}
      </Text>
    );
  };

  return (
    <Modal
      isVisible={showModal}
      hasBackdrop={true}
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}
      backdropColor={colors.modalBg}
      style={styles.modalStyle}>
      <SafeAreaView
        style={styles.modalContainer(portrait)}
        edges={['left', 'right']}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.question}>{data?.question}</Text>
          {data?.options?.map((item, index) => {
            return data?.type === 'Correct'
              ? renderAnwerCorrectCase(item, index)
              : renderAnwerWrongCase(item, index);
          })}

          {renderAnswerType()}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default ResultModal;

const styles = StyleSheet.create({
  modalContainer: portrait => ({
    flex: portrait ? 0.618 : 0.8,
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }),
  modalStyle: {margin: 0, justifyContent: 'flex-end'},
  headerView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 32,
    paddingBottom: 20,
  },
  closeIcon: {
    width: 13,
    height: 13,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
  },
  question: {
    marginLeft: 24,
    marginRight: 37,
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
    marginBottom: 40,
    marginTop: 20,
  },
  optionButton: {
    width: 22,
    height: 22,
    backgroundColor: colors.optionButton,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.optionBorder,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    backgroundColor: colors.background,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 6,
    shadowColor: colors.cardShadow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 2,
    marginBottom: 20,
  },
  optionText: {
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginLeft: 12,
  },
  answer: {
    color: colors.switchTrue,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 17,
    marginLeft: 24,
    marginRight: 37,
    marginBottom: 40,
  },
  checked: {
    width: 23,
    height: 23,
  },
  correct: {backgroundColor: colors.switchTrue},
  wrong: {
    backgroundColor: colors.inputTextWrongBorder,
  },
  wrongText: {
    color: colors.inputTextWrongBorder,
  },
  textChange: {
    color: colors.background,
  },
});
