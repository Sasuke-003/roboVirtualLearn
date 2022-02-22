import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Touchable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  DrawerHeader,
  Offers,
  HomeCategories,
  ChoiceYourCourse,
  DisplayCourses,
} from '../components';
import {images, colors, strings, fonts} from '../assets';
import {getUserDetails} from '../redux/reducers/userReducer';
import {useSelector, useDispatch} from 'react-redux';
import {api} from '../network';
import {NAVIGATION_ROUTES} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

const headerLeftIcon = () => (
  <Image style={styles.headerLeftIcon} source={images.hamburgerMenuIcon} />
);

const headerRightIcon = () => (
  <Image style={styles.headerRightIcon} source={images.searchIcon} />
);

const VIR_HomeScreen = ({
  navigation,
  goToSearchScreen,
  gotoCourseDetailsScreen,
}) => {
  const userDetails = useSelector(getUserDetails);
  const [topCategories, setTopCategories] = useState([]);
  const [showProfileNotCompleted, setShowProfileNotCompleted] = useState(false);
  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const {
          data: {data},
        } = await api.course.getTopSearchedCategories();
        setTopCategories(data);
      } catch (error) {
        console.warn(error);
        setTopCategories([]);
      }
    };
    getCategoriesData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setShowProfileNotCompleted(false);
      setTimeout(function () {
        if (!checkProfileCompleted()) setShowProfileNotCompleted(true);
      }, 5000);
    }, []),
  );

  const checkProfileCompleted = () => {
    if (!userDetails) return false;
    if (!userDetails.data) return false;
    if (userDetails.data.fullname === '') return false;
    if (userDetails.data.username === '') return false;
    if (userDetails.data.email === '') return false;
    if (!userDetails.data.dateOfBirth) return false;
    if (userDetails.data.gender === '') return false;
    if (userDetails.data.image === '') return false;
    if (userDetails.data.coverImage === '') return false;
    return true;
  };

  const headerLeftIconOnPress = () => {
    navigation.openDrawer();
  };

  const headerRightIconOnPress = () => {
    goToSearchScreen();
  };

  const goToProfileScreen = () => {
    navigation.navigate(NAVIGATION_ROUTES.PROFILE_STACK, {
      screen: NAVIGATION_ROUTES.PROFILE_EDIT,
    });
  };

  const welcomeText = () => (
    <View style={styles.welcomeText}>
      <Text style={styles.hello}>{strings.homeScreen.hello}</Text>
      <Text style={styles.name}>
        {userDetails && userDetails.data.fullname}
      </Text>
    </View>
  );
  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <DrawerHeader
          leftIcon={headerLeftIcon}
          leftIconOnPress={headerLeftIconOnPress}
          rightIcon={headerRightIcon}
          rightIconOnPress={headerRightIconOnPress}
          style={{paddingHorizontal: 24}}
          right={24}
        />
        {welcomeText()}
        <Offers />
        <HomeCategories />
        <ChoiceYourCourse gotoCourseDetailsScreen={gotoCourseDetailsScreen} />
        {topCategories.length > 0 && (
          <DisplayCourses
            gotoCourseDetailsScreen={gotoCourseDetailsScreen}
            title={`Top courses in ${topCategories[0].name}`}
            api={async () =>
              await api.course.getAllCourses(topCategories[0].name)
            }
          />
        )}
        {topCategories.length > 1 && (
          <DisplayCourses
            gotoCourseDetailsScreen={gotoCourseDetailsScreen}
            title={`Top courses in ${topCategories[1].name}`}
            api={async () =>
              await api.course.getAllCourses(topCategories[1].name)
            }
          />
        )}
      </ScrollView>
      {showProfileNotCompleted && (
        <View style={styles.completeProfileConTainer}>
          <View style={styles.completeProfileTextWrapper}>
            <Text style={styles.completeProfileTitle}>
              {strings.homeScreen.completeProfileTitle}
            </Text>
            <Text style={styles.completeProfileDesc}>
              {strings.homeScreen.completeProfileDesc}
            </Text>
          </View>
          <TouchableOpacity onPress={goToProfileScreen}>
            <Image
              source={images.profileNextIcon}
              style={styles.profileNextIcon}
            />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default VIR_HomeScreen;

const styles = StyleSheet.create({
  container: {height: '100%'},
  headerLeftIcon: {height: 17, width: 25},
  headerCenterComponent: {height: 24, width: 113, marginLeft: 32},
  headerRightIcon: {height: 22, width: 22},
  topContainer: {
    flex: 10,
  },
  welcomeText: {
    marginTop: 20,
    paddingHorizontal: 24,
    marginBottom: 0,
  },
  hello: {
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 18,
    color: colors.secondaryText,
  },
  name: {
    fontFamily: fonts.biko,
    fontSize: 20,
    color: colors.phoneNumberActive,
    fontWeight: 'bold',
    marginTop: 8,
  },
  completeProfileConTainer: {
    position: 'absolute',
    bottom: 30,
    height: 60,
    width: '90%',
    backgroundColor: colors.categoryBackground,
    marginHorizontal: 24,
    alignSelf: 'center',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileNextIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  completeProfileTextWrapper: {
    marginLeft: 22,
    width: '80%',
  },
  completeProfileTitle: {
    color: colors.primaryText,
    fontFamily: fonts.BikoBold,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 5,
  },
  completeProfileDesc: {
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 10,
    lineHeight: 20,
  },
});
