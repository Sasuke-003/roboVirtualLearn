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
  FlatList,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {images, strings, fonts, colors} from '../assets';
import {Categories, Courses, SearchModal, TopSearches} from '../components';
import {NAVIGATION_ROUTES} from '../constants';
import {useDimension} from '../hooks';
import {
  showSearchScreenModal,
  getShowSearchModal,
  getFilteredCourses,
} from '../redux/reducers/filterSearchReducer';

const VIR_ChoiceYourCourse = props => {
  const [enteredText, setEnteredText] = useState('');
  const filteredResult = useSelector(getFilteredCourses);
  const {height, width, isPortrait} = useDimension();

  const showModal = useSelector(getShowSearchModal);
  const dispatch = useDispatch();

  const onPressBack = () => {
    props.navigation.navigate(NAVIGATION_ROUTES.HOME_SCREEN);
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
        <Text style={styles.headerTitle}>
          {strings.searchScreen.choiceYourCourse}
        </Text>
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
        <Categories
          title={strings.searchScreen.categories}
          enteredText={enteredText}
          isModal={false}
        />
        {renderCourse()}
      </View>
    );
  };

  const renderCourse = () => {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 30}}>
          <Text style={styles.AllCourses}>
            {strings.searchScreen.AllCourses}
          </Text>

          <Courses
            text={enteredText}
            isSearchScreen={false}
            gotoCourseDetailsScreen={props.gotoCourseDetailsScreen}
          />
        </View>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <>
        {filteredResult.length <= 0 && enteredText.length == 0 ? (
          renderCategory()
        ) : (
          <Courses text={enteredText} isSearchScreen={false} />
        )}
      </>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
          {renderHeader()}
          {renderTextInput()}

          <FlatList
            data={[{}]}
            renderItem={() => renderContent()}
            showsVerticalScrollIndicator={false}></FlatList>
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
    justifyContent: 'flex-start',
  },
  innerContainer: {
    flex: 1,
  },

  header: {
    flexDirection: 'column',
  },
  headerTitle: {
    color: colors.primaryText,
    fontFamily: fonts.BikoBold,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 28,
    textAlign: 'left',
    paddingTop: 25,
  },
  backIcon: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
  },
  textInputContainer: {
    marginTop: 30,
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
  },
  AllCourses: {
    color: 'black',
    fontFamily: fonts.proximaNovaBold,
    fontWeight: '600',
    fontSize: 19,
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'left',
    paddingTop: 5,
  },
});
export default VIR_ChoiceYourCourse;
