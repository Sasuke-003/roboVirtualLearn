import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {strings, fonts, images, colors} from '../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Stepper from './Stepper';

const ChapterContent = ({chapter, onPressIntro, courseId, courseName}) => {
  const [showContent, setShowContent] = useState(false);
  const [position, setPosition] = useState(0);

  const renderTitle = () => (
    <View style={styles.chapterNameContainer}>
      <Text
        style={
          styles.chapterTitleText
        }>{`${strings.courseDetailsSCreen.chapterText} ${chapter.order} - ${chapter.name}`}</Text>
      <TouchableOpacity onPress={() => setShowContent(!showContent)}>
        <Text style={styles.chapterShowIcon}>{showContent ? '-' : '+'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.chapterContainer}>
      {renderTitle()}
      {showContent && (
        <Stepper
          position={position}
          chapter={chapter}
          onPressIntro={onPressIntro}
          courseId={courseId}
          courseName={courseName}
        />
      )}
    </View>
  );
};

const Chapters = ({course, onPressIntro}) => {
  const renderCourseContent = () => (
    <View style={styles.courseContentContainer}>
      <Text style={styles.courseContentTitle}>
        {strings.courseDetailsSCreen.courseContentText}
      </Text>
      <Text style={styles.courseContent}>
        {`${course?.courseContent?.chapter} Chapter${
          course?.courseContent?.chapter > 1 ? 's' : ''
        } | `}
        {`${course?.courseContent?.lesson} Lesson${
          course?.courseContent?.lesson > 1 ? 's' : ''
        } | `}
        {`${course?.courseContent?.assignmentTest} Assignment Test${
          course?.courseContent?.assignmentTest > 1 ? 's' : ''
        } | `}
        {`${course?.courseContent?.totalLength / 60}h total length`}
      </Text>
    </View>
  );
  const chapters = course?.chapters
    ?.slice()
    .sort((a, b) => a.chapterID.order - b.chapterID.order);
  return (
    <View style={styles.container}>
      {renderCourseContent()}
      <View style={styles.courseContentsContainer}>
        {chapters.map((chapter, index) => (
          <ChapterContent
            key={index}
            chapter={chapter.chapterID}
            onPressIntro={onPressIntro}
            courseId={course?._id}
            courseName={course?.name}
          />
        ))}
      </View>
    </View>
  );
};

export default Chapters;

const styles = StyleSheet.create({
  container: {marginTop: 30, backgroundColor: colors.background},
  courseContentContainer: {},
  courseContentTitle: {
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 19,
    fontWeight: '600',
    lineHeight: 22,
  },
  courseContent: {
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 15,
    marginTop: 4,
  },
  chapterNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  courseContentsContainer: {
    marginTop: 30,
    backgroundColor: colors.background,
    flex: 1,
  },
  chapterTitleText: {
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 15,
  },
  chapterShowIcon: {
    color: colors.buttonBackground,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
  },
  chapterContainer: {
    marginBottom: 15,
  },
});
