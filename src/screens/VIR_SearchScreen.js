import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {images, strings, fonts, colors} from '../assets';
import {Categories, Courses, SearchModal} from '../components';
import {NAVIGATION_ROUTES} from '../constants';
import {
  showSearchScreenModal,
  getShowSearchModal,
} from '../redux/reducers/filterSearchReducer';
Icon.loadFont().then();

const VIR_SearchScreen = props => {
  const [enteredText, setEnteredText] = useState('');

  const showModal = useSelector(getShowSearchModal);
  const dispatch = useDispatch();

  const onPressBack = () => {
    props.navigation.navigate(NAVIGATION_ROUTES.DRAWER_NAVIGATOR);
  };

  const onPressFilter = () => {
    dispatch(showSearchScreenModal(true));
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressBack}>
          <Image
            source={images.searchScreen.backIcon}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{strings.searchScreen.search}</Text>
      </View>
    );
  };
  const renderTextInput = () => {
    return (
      <View style={styles.textInputContainer}>
        <View style={styles.inputLeftPart}>
          <Image
            source={images.searchScreen.searchIcon}
            style={styles.searchIcon}
          />
          <TextInput
            value={enteredText}
            onChangeText={value => setEnteredText(value)}
            placeholder={strings.searchScreen.search}
            placeholderTextColor={colors.secondaryText}
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={onPressFilter}>
          <View>
            <Image
              source={images.searchScreen.filterSearch}
              style={styles.filterIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const renderCategory = () => {
    return (
      <View style={styles.categoryContainer}>
        <Categories title={strings.searchScreen.searchCategories} />
      </View>
    );
  };

  const renderCourse = () => {
    return <Courses text={enteredText} />;
  };

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
          {renderHeader()}
          <View style={{flex: 1}}>
            {renderTextInput()}
            {enteredText.length <= 0 ? renderCategory() : renderCourse()}
          </View>
        </View>
      </SafeAreaView>
      {showModal && <SearchModal />}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 25,
  },

  header: {
    flexDirection: 'row',
  },
  headerTitle: {
    flex: 1,
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.39,
    lineHeight: 28,
    textAlign: 'center',
  },
  backIcon: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
  },
  textInputContainer: {
    marginTop: 40,
    flexDirection: 'row',
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  filterIcon: {
    width: Platform.OS === 'android' ? 50 : 45,
    height: Platform.OS === 'android' ? 50 : 45,
    resizeMode: 'contain',
  },
  inputLeftPart: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    borderColor: colors.primaryText,
    borderWidth: 1,
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 12 : 0,
    marginRight: 15,
    paddingHorizontal: Platform.OS === 'android' ? 10 : null,
  },
  input: {
    paddingHorizontal: 10,
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaBold,
    fontWeight: '600',
    fontSize: 17,
    letterSpacing: 0.31,
    lineHeight: 20,
    textAlign: 'left',
    width: '100%',
  },

  categoryContainer: {
    flex: 1,
    marginTop: 40,
  },
});
export default VIR_SearchScreen;
