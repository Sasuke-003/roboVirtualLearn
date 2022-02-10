import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors, fonts, images, strings} from '../assets';

const ListModal = ({showModal, setShowModal, data, onPressSelectionList}) => {
  return (
    <Modal
      visible={showModal}
      transparent
      onRequestClose={() => setShowModal(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.dataContainer}>
          <FlatList
            bounces={false}
            data={data}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => onPressSelectionList(item.value)}>
                  <View style={styles.contentView}>
                    <Text style={styles.contentText}>{item.value}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={styles.seperator}></View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ListModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.modalBg,
  },
  dataContainer: {
    backgroundColor: colors.background,
    width: '60%',
    borderRadius: 3,
  },
  contentView: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    fontFamily: fonts.proximaNovaBold,
    color: colors.phoneNumberActive,
  },
  seperator: {
    height: 0.5,
    backgroundColor: colors.seperator,
  },
});
