import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  showSearchScreenModal,
  getShowSearchModal,
  clearFilter,
  getCategory,
  getChapters,
  getFilteredCourses,
  setFilteredCourses,
} from '../redux/reducers/filterSearchReducer';
import Modal from 'react-native-modal';
import {Categories} from './index';
import {images, strings, fonts, colors} from '../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Duration from './Duration';
import {api} from '../network';

const SearchModal = props => {
  const showModal = useSelector(getShowSearchModal);
  const categories = useSelector(getCategory);
  const chapters = useSelector(getChapters);

  const dispatch = useDispatch();

  const onPressApplyFilter = async () => {
    try {
      const response = await api.course.getFilteredSearch(categories, chapters);
      if (response.status === 200) {
        dispatch(setFilteredCourses(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onPressClearAll = () => {
    dispatch(clearFilter());
  };

  const renderTitle = () => {
    return (
      <View style={styles.header}>
        <View style={{flex: 2}}>
          <Text style={styles.title}>{strings.searchScreen.modalTitle}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => dispatch(showSearchScreenModal(false))}>
            <Image
              source={images.searchScreen.modalClose}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal
      isVisible={showModal}
      style={styles.modalStyle}
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.4}
      onBackdropPress={() => dispatch(showSearchScreenModal(false))}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          {renderTitle()}

          <View>
            <Categories
              title={strings.searchScreen.categories}
              isModal={true}
            />
            <Duration />
          </View>

          <View style={styles.filterContainer}>
            <TouchableOpacity onPress={onPressApplyFilter}>
              <Text style={styles.applyFilter}>
                {strings.searchScreen.applyFilter}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.clearContainer}>
            <TouchableOpacity onPress={onPressClearAll}>
              <Text style={styles.clearAll}>
                {strings.searchScreen.clearAll}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '65%',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 5,
  },
  title: {
    textAlign: 'center',
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.39,
    lineHeight: 28,
    paddingStart: 30,
  },
  icon: {
    width: 15,
    height: 15,
  },
  applyFilter: {
    textAlign: 'center',
    color: colors.background,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.39,
    lineHeight: 20,
  },
  filterContainer: {
    padding: 15,
    backgroundColor: colors.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: 5,
  },
  clearAll: {
    textAlign: 'center',
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.39,
    lineHeight: 20,
  },
  clearContainer: {
    padding: 15,
    backgroundColor: colors.background,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: 5,
    borderColor: colors.primaryText,
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 5,
  },
});

export default SearchModal;
