import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {colors, images, fonts, strings} from '../assets';
import {getEnrolledCourses} from '../redux/reducers/MyCourseReducer';

const OngoingCourse = props => {
  return (
    <View style={styles.innerContainer}>
      <ImageBackground
        source={images.myCourses.CourseOngoing}
        style={styles.bgImage}>
        <View style={styles.content}>
          <Text style={styles.ongoingText}>{strings.myCourses.ongoing}</Text>
          <View style={styles.bottomPart}>
            <Text style={styles.courseName}>Art & Illustration</Text>
            <Text style={styles.chapterNO}>15/20 Chapters</Text>
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

  return (
    <View style={styles.container}>
      <OngoingCourse />
      <OngoingCourse />
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
    resizeMode: 'cover',
    width: 350,
    height: 220,
  },
  content: {
    flex: 1,
    paddingTop: 45,
    paddingHorizontal: 30,
  },

  ongoingText: {
    color: colors.background,
    fontFamily: fonts.proximaNovaMedium,
    fontWeight: '500',
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 15,
    textAlign: 'left',
  },
  bottomPart: {
    flex: 1,
    paddingTop: 40,
  },
  courseName: {
    color: colors.background,
    fontFamily: fonts.proximaNovaMedium,
    fontWeight: '500',
    fontSize: 17,
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'left',
    paddingVertical: 2,
  },
  chapterNO: {
    color: colors.background,
    fontFamily: fonts.proximaNovaRegular,
    fontWeight: '500',
    fontSize: 12,
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
