import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-cards';

import {useSelector} from 'react-redux';
import {colors, images, fonts, strings} from '../assets';
import {getEnrolledCourses} from '../redux/reducers/MyCourseReducer';

const OngoingCourse = props => {
  const course = props.course;

  return (
    <View style={styles.innerContainer}>
      <ImageBackground
        source={{uri: course.courseImageUrl}}
        style={styles.bgImage}>
        <View style={styles.content}>
          <Text style={styles.ongoingText}>{strings.myCourses.ongoing}</Text>
          <View style={styles.bottomPart}>
            <Text style={styles.courseName} numberOfLines={1}>
              {course.name}
            </Text>
            <Text style={styles.chapterNO}>
              {course.courseContent.chapter} Chapters
            </Text>
            <TouchableOpacity>
              <View style={styles.button}>
                <Text style={styles.continue}>
                  {strings.myCourses.continue}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const OngoingScreen = () => {
  const enrolledCourses = useSelector(getEnrolledCourses);
  const ongoingCourses = enrolledCourses.filter(
    course => course.progress.courseCompletionRate < 100,
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ongoingCourses}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <OngoingCourse {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
  },
  innerContainer: {
    borderWidth: 0.2,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
    height: 160,
    marginVertical: 10,
  },
  bgImage: {
    resizeMode: 'contain',
    width: 350,
    height: 220,
  },
  content: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
    backgroundColor: '#00000060',
  },

  ongoingText: {
    color: colors.background,
    fontFamily: fonts.proximaNovaMedium,
    fontWeight: '500',
    fontSize: 15,
    letterSpacing: 0,
    lineHeight: 15,
    textAlign: 'left',
  },
  bottomPart: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 15,
  },
  courseName: {
    color: colors.background,
    fontFamily: fonts.proximaNovaMedium,
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'left',
    paddingVertical: 2,
  },
  chapterNO: {
    color: colors.background,
    fontFamily: fonts.proximaNovaRegular,
    fontWeight: '500',
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 15,
    textAlign: 'left',
    paddingBottom: 13,
  },
  button: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  continue: {
    color: colors.background,
    fontFamily: fonts.proximaNovaMedium,
    fontWeight: '500',
    fontSize: 12.5,
    letterSpacing: 0,
    lineHeight: 12,
    textAlign: 'left',
  },
});
export default OngoingScreen;
