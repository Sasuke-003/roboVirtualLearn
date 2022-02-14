import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
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

const headerLeftIcon = () => (
  <Image style={styles.headerLeftIcon} source={images.hamburgerMenuIcon} />
);

const headerRightIcon = () => (
  <Image style={styles.headerRightIcon} source={images.searchIcon} />
);

const VIR_HomeScreen = ({navigation}) => {
  const userDetails = useSelector(getUserDetails);
  const [topCategories, setTopCategories] = useState([]);
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

  const headerLeftIconOnPress = () => {
    navigation.openDrawer();
  };

  const headerRightIconOnPress = () => {};

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
        <Categories />
        <ChoiceYourCourse />
        {topCategories.length > 0 && (
          <DisplayCourses
            title={`Top courses in ${topCategories[0].name}`}
            api={async () =>
              await api.course.getAllCourses(topCategories[0].name)
            }
          />
        )}
        {topCategories.length > 1 && (
          <DisplayCourses
            title={`Top courses in ${topCategories[1].name}`}
            api={async () =>
              await api.course.getAllCourses(topCategories[1].name)
            }
          />
        )}
      </ScrollView>
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
});
