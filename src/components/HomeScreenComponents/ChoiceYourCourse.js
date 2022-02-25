import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {api} from '../../network';
import {colors, fonts, strings} from '../../assets';
import {NAVIGATION_ROUTES} from '../../constants';

const CourseCard = ({
  course: {
    courseImageUrl,
    name,
    courseContent: {chapter},
    _id,
  },
  gotoCourseDetailsScreen,
}) => {
  return (
    <TouchableOpacity onPress={() => gotoCourseDetailsScreen(_id)}>
      <View style={styles.cardContainer}>
        <Image style={styles.cardImage} source={{uri: courseImageUrl}} />
        <View style={styles.courseNameWrapper}>
          <Text style={styles.courseName}>
            {name.length > 60 ? name.slice(0, 60) + '...' : name}
          </Text>
          <Text style={styles.chapters}>{`${chapter} Chapter${
            chapter > 1 && 's'
          }`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ChoiceYourCourse = ({gotoCourseDetailsScreen}) => {
  const [sortBy, setSortBy] = useState(strings.homeScreen.sortTypeAll);
  const [courses, setCourses] = useState([]);
  const navigation = useNavigation();
  const getCoursesData = async () => {
    try {
      const {
        data: {courses},
      } = await api.course.getAllCourses();
      setCourses(courses);
    } catch (error) {
      console.log(error);

      setCourses([]);
    }
  };
  useEffect(() => {
    getCoursesData();
  }, []);

  const onClickSeeAll = () => {
    navigation.navigate(NAVIGATION_ROUTES.CHOICE_YOUR_COURSE);
  };

  const title = () => (
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{strings.homeScreen.choiceYourCourse}</Text>
      <TouchableOpacity onPress={onClickSeeAll}>
        <Text style={styles.seeAll}>{strings.homeScreen.seeAll}</Text>
      </TouchableOpacity>
    </View>
  );

  const SortButtonNames = [
    strings.homeScreen.sortTypeAll,
    strings.homeScreen.sortTypePopular,
    strings.homeScreen.sortTypeNewest,
  ];

  const SortButtons = ({name}) => (
    <TouchableOpacity onPress={() => setSortBy(name)}>
      <View
        style={[styles.sortButton, sortBy === name && styles.sortButtonActive]}>
        <Text
          style={[
            styles.sortButtonText,
            sortBy === name && styles.sortButtonTextActive,
          ]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    courses.length > 0 && (
      <View style={styles.container}>
        {title()}
        <View style={styles.sortButtonsContainer}>
          {SortButtonNames.map((name, index) => (
            <SortButtons key={index} name={name} />
          ))}
        </View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={
            sortBy === strings.homeScreen.sortTypeAll
              ? courses.slice().sort((a, b) => (a.name > b.name ? 1 : -1))
              : sortBy === strings.homeScreen.sortTypePopular
              ? courses
                  .slice()
                  .sort((a, b) => b.searchFrequency - a.searchFrequency)
              : courses.slice().reverse()
          }
          renderItem={({item}) => (
            <CourseCard
              course={item}
              gotoCourseDetailsScreen={gotoCourseDetailsScreen}
            />
          )}
        />
      </View>
    )
  );
};

export default ChoiceYourCourse;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  flatListContainer: {
    marginTop: 20,
    paddingLeft: 24,
    paddingRight: 16,
    // width: '100%',
    // flexWrap: 'wrap',
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 15,
  },
  title: {
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 18,
    fontWeight: '600',
  },
  seeAll: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 12,
  },
  sortButtonsContainer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    marginRight: 5,
    height: 26,
    paddingHorizontal: 10,
    minWidth: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortButtonActive: {
    backgroundColor: colors.sortTypeButton,

    borderRadius: 6,
  },
  sortButtonText: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 12,
    fontWeight: '500',
  },
  sortButtonTextActive: {
    color: colors.phoneNumberActive,
  },
  cardContainer: {
    width: 180,
    height: 176,
    borderRadius: 6,
    marginRight: 14,
    shadowColor: colors.cardShadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 4,
    backgroundColor: colors.background,
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: '60%',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  courseNameWrapper: {
    padding: 10,
  },
  courseName: {
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 10,
    fontWeight: '600',
  },
  chapters: {
    marginTop: 4,
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 8,
    fontWeight: '500',
  },
});
