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
import {api} from '../network';
import {colors, fonts, images, strings} from '../assets';
import Icon from 'react-native-vector-icons/Feather';
import {utils} from '../utils';

const CourseCard = ({
  course: {
    name,
    courseImageUrl,
    courseContent: {chapter, totalLength},
    _id,
  },
  gotoCourseDetailsScreen,
}) => {
  return (
    <View style={styles.courseContainer}>
      <TouchableOpacity onPress={() => gotoCourseDetailsScreen(_id)}>
        <View style={{justifyContent: 'center'}}>
          <Image style={styles.courseImage} source={{uri: courseImageUrl}} />
          <Image style={styles.playButton} source={images.playButton} />
        </View>
        <Text style={styles.courseName}>{name}</Text>
        <View style={styles.courseDetails}>
          <Text style={styles.chapter}>{`${chapter} Chapter${
            chapter > 1 && 's'
          }`}</Text>
          <View style={styles.courseLengthWrapper}>
            <Icon size={13} name="clock" style={styles.courseLengthIcon} />
            <Text style={styles.courseLength}>
              {utils.getHoursMinutesFromMinutes(totalLength)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const DisplayCourses = ({
  title = '',
  onClickSeeAll = () => {},
  api,
  containerStyle,
  disableSeeAll = false,
  searchKey = 'courses',
  gotoCourseDetailsScreen,
}) => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const getCoursesData = async () => {
      try {
        const {data} = await api();
        setCourses(data[searchKey]);
      } catch (error) {
        console.log(error);
        setCourses([]);
      }
    };
    getCoursesData();
  }, []);
  const renderTitle = () => (
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{title}</Text>
      {!disableSeeAll && (
        <TouchableOpacity onPress={onClickSeeAll}>
          <Text style={styles.seeAll}>{strings.homeScreen.seeAll}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
  return (
    courses.length > 0 && (
      <View style={[styles.container, containerStyle]}>
        {renderTitle()}
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={courses}
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

export default DisplayCourses;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  flatListContainer: {
    // marginTop: 15,
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
  courseContainer: {
    marginRight: 25,
    width: 288,
  },
  courseImage: {
    width: 288,
    height: 140,
    borderRadius: 10,
  },
  courseName: {
    marginTop: 10,
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 15,
  },
  chapter: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 13,
  },

  courseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  courseLengthWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseLengthIcon: {
    color: colors.secondaryText,
    marginLeft: 12,
    marginRight: 5,
  },
  courseLength: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 11.54,
  },
  playButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
});
