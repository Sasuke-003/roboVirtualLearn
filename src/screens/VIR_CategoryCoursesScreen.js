import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  DrawerHeader,
  Offers,
  Categories,
  ChoiceYourCourse,
  DisplayCourses,
} from '../components';
import {images, colors, strings, fonts} from '../assets';
import {getUserDetails} from '../redux/reducers/userReducer';
import {useSelector, useDispatch} from 'react-redux';
import {api} from '../network';
import {NAVIGATION_ROUTES} from '../constants';

const headerLeftIcon = () => (
  <Image
    style={styles.headerLeftIcon}
    source={images.verifyAccountScreen.backIcon}
  />
);

const headerRightIcon = () => (
  <Image style={styles.headerRightIcon} source={images.searchIcon} />
);

const renderTitleDescription = categoryName => (
  <View style={styles.titleDescriptionContainer}>
    <Text style={styles.title}>{categoryName}</Text>
  </View>
);

const VIR_CategoryCoursesScreen = ({
  navigation,
  route: {
    params: {categoryName, categoryId},
  },
}) => {
  const headerLeftIconOnPress = () => {
    navigation.goBack();
  };
  const headerRightIconOnPress = () => {};
  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <DrawerHeader
          leftIcon={headerLeftIcon}
          leftIconOnPress={headerLeftIconOnPress}
          rightIcon={headerRightIcon}
          rightIconOnPress={headerRightIconOnPress}
          style={{paddingHorizontal: 24}}
          right={24}
        />
        {renderTitleDescription(categoryName)}
        {categoryName !== '' > 1 && (
          <DisplayCourses
            disableSeeAll
            containerStyle={{marginTop: 0}}
            title={`${strings.categoryCoursesScreen.getYouStarted}`}
            api={async () => await api.course.getAllCourses(categoryName)}
          />
        )}
        {categoryId !== '' > 1 && (
          <DisplayCourses
            disableSeeAll
            containerStyle={{marginTop: 5}}
            title={`${strings.categoryCoursesScreen.featuredCourses}`}
            api={async () =>
              await api.course.getTopCoursesFromACategory(categoryId)
            }
            searchKey="data"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VIR_CategoryCoursesScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.background,
  },
  headerLeftIcon: {height: 17, width: 27},
  headerCenterComponent: {height: 24, width: 113, marginLeft: 32},
  headerRightIcon: {height: 22, width: 22},
  titleDescriptionContainer: {
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    color: colors.primaryText,
    fontFamily: fonts.bikoRegular,
    fontSize: 26,
    fontWeight: 'bold',
  },
  description: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 16,
  },
});
