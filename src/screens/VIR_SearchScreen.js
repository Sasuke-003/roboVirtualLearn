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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {images, strings, fonts, colors} from '../assets';
import {Categories, Courses} from '../components';
import {NAVIGATION_ROUTES} from '../constants';
Icon.loadFont().then();

const VIR_SearchScreen = props => {
  const [enteredText, setEnteredText] = useState('');
  const [searchedArray, setSearchedArray] = useState([]);

  const onPressBack = () => {
    props.navigation.navigate(NAVIGATION_ROUTES.DRAWER_NAVIGATOR);
  };
  const onSearchArray = value => {
    setSearchedArray(value);
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
        <TouchableOpacity>
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
    if (enteredText.length === 0 || searchedArray.length <= 0) {
      return <Categories title={strings.searchScreen.searchCategories} />;
    }

    return;
  };

  const renderCourse = () => {
    if (enteredText.length > 0) {
      return (
        <Courses
          text={enteredText}
          searchedArray={onSearchArray}
          arr={searchedArray}
        />
      );
    }
    return;
  };

  const renderNoResults = () => {
    if (enteredText.length > 0 && searchedArray.length <= 0) {
      return <Text>No Results Found</Text>;
    }

    return;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        {renderHeader()}

        {renderTextInput()}
        {renderNoResults()}
        {renderCategory()}
        {renderCourse()}
      </View>
    </SafeAreaView>
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
});
export default VIR_SearchScreen;
