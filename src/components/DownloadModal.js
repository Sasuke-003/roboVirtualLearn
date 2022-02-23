import {
  StyleSheet,
  Text,
  View,
  // Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors, fonts, images, strings} from '../assets';
import Modal from 'react-native-modal';
const DownloadModal = ({showModal, setShowModal}) => {
  return (
    <Modal
      isVisible={showModal}
      //   hasBackdrop={true}
      //   onBackdropPress={() => setShowModal(false)}
      animationOut="fadeOut"
      onBackButtonPress={() => setShowModal(false)}
      backdropColor={colors.modalBg}>
      <View style={styles.modalContainer}>
        <ActivityIndicator size="large" color={colors.background} />
        <Text style={styles.text}>Downloading...</Text>
      </View>
    </Modal>
  );
};

export default DownloadModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 20,
  },
});
