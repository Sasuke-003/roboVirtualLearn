import {useNavigation} from '@react-navigation/core';
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
import {useSelector} from 'react-redux';
import {colors, images, fonts, strings} from '../assets';
import {getEnrolledCourses} from '../redux/reducers/MyCourseReducer';

const CompletedCourse = props => {
  const course = props.course;
  const progress = props.progress;
  const onPressView = () => {
    props.gotoCourseDetailsScreen(course._id);
  };
  return (
    <View style={styles.innerContainer}>
      <ImageBackground
        source={{uri: course.courseImageUrl}}
        style={styles.bgImage}>
        <View style={styles.content}>
          <Text style={styles.ongoingText}>{strings.myCourses.completed}</Text>
          <View style={styles.bottomPart}>
            <Text style={styles.courseName} numberOfLines={1}>
              {course.name}
            </Text>
            <Text style={styles.chapterNO}>
              {progress.courseApprovalRate}% Approval Rate
            </Text>
            <TouchableOpacity onPress={onPressView}>
              <View style={styles.button}>
                <Text style={styles.continue}>
                  {strings.myCourses.viewCertificate}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const CompletedScreen = props => {
  const navigation = useNavigation();
  const enrolledCourses = useSelector(getEnrolledCourses);
  const CompletedCourses = enrolledCourses.filter(
    course => course.progress.courseCompletionRate === 100,
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={CompletedCourses}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <CompletedCourse
            {...item}
            gotoCourseDetailsScreen={props.gotoCourseDetailsScreen}
          />
        )}
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
    resizeMode: 'cover',
    width: 350,
    height: 220,
  },
  content: {
    flex: 1,
    paddingTop: 45,
    paddingHorizontal: 30,
    backgroundColor: '#00000060',
  },

  ongoingText: {
    color: colors.background,
    fontFamily: fonts.proximaNovaMedium,
    fontWeight: '500',
    fontSize: 12.5,
    letterSpacing: 0,
    lineHeight: 15,
    textAlign: 'left',
  },
  bottomPart: {
    flex: 1,
    paddingTop: 37,
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
    fontSize: 12.5,
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
export default CompletedScreen;
