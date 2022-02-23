import React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';

import {Categories, DrawerHeader} from '../components';
import {images, colors, strings, fonts} from '../assets';
import {api} from '../network';

import {useDispatch, useSelector} from 'react-redux';
import {
  clearEnrolledCourses,
  getEnrolledCourses,
  setEnrolledCourses,
} from '../redux/reducers/MyCourseReducer';

import MyCoursesTopTabNavigator from '../navigators/MyCoursesTopTabNavigator';

const headerLeftIcon = () => (
  <Image style={styles.headerLeftIcon} source={images.hamburgerMenuIcon} />
);

const headerRightIcon = () => (
  <Image style={styles.headerRightIcon} source={images.searchIcon} />
);
const VIR_MyCourses = ({
  navigation,
  goToSearchScreen,
  gotoCourseDetailsScreen,
}) => {
  const enrolledCourses = useSelector(getEnrolledCourses);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const headerLeftIconOnPress = () => {
    navigation.openDrawer();
  };

  const headerRightIconOnPress = () => {
    goToSearchScreen();
  };

  useEffect(() => {
    const getEnrolledCourses = async () => {
      try {
        setIsLoading(true);
        const response = await api.course.getEnrolledCourses();
        if (response.status === 200) {
          dispatch(setEnrolledCourses(response.data.coursesEnrolled));
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response.status === 409) {
          dispatch(clearEnrolledCourses());
        } else if (error.response.status === 401) {
          console.warn('Authentication failed');
        } else {
          console.log('Internal server error');
        }
        setIsLoading(false);
      }
    };
    getEnrolledCourses();
    return () => {
      setIsLoading(false);
    };
  }, []);

  const renderCourses = () => {
    return (
      <MyCoursesTopTabNavigator
        gotoCourseDetailsScreen={gotoCourseDetailsScreen}
      />
    );
  };

  const renderStartPage = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={styles.emptyPageContainer}>
          <View style={{alignSelf: 'center'}}>
            <Image
              source={images.myCourses.CourseEmpty}
              style={styles.emptyImage}
            />
          </View>
          <Text style={styles.question}>{strings.myCourses.question}</Text>
          <Text style={styles.message}>{strings.myCourses.message}</Text>

          <Categories title={strings.searchScreen.categories} isModal={false} />
        </View>
      </ScrollView>
    );
  };
  const renderContent = () => {
    if (isLoading) {
      return (
        <ActivityIndicator size={70} style={styles.indicator} color="black" />
      );
    } else {
      if (enrolledCourses.length > 0) {
        return renderCourses();
      } else {
        return renderStartPage();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <DrawerHeader
          leftIcon={headerLeftIcon}
          leftIconOnPress={headerLeftIconOnPress}
          rightIcon={headerRightIcon}
          rightIconOnPress={headerRightIconOnPress}
        />
        <Text style={styles.title}>{strings.myCourses.title}</Text>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {height: '100%'},
  headerLeftIcon: {height: 17, width: 25},
  headerCenterComponent: {height: 24, width: 113, marginLeft: 32},
  headerRightIcon: {height: 22, width: 22},
  container: {
    flex: 1,

    backgroundColor: colors.background,
  },
  innerContainer: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 26,
  },
  title: {
    color: colors.primaryText,
    fontFamily: fonts.BikoBold,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 35,
    textAlign: 'left',
    marginTop: 20,
  },
  emptyImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  emptyPageContainer: {
    flex: 1,
    justifyContent: 'center',

    marginTop: 50,
  },
  question: {
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 15,
  },
  message: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 20,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 50,
  },
});
export default VIR_MyCourses;
