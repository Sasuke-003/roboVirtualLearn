import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  InteractionManager,
  ColorPropType,
} from 'react-native';
import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import {useNavigation} from '@react-navigation/native';
import {strings, fonts, images, colors} from '../../assets';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Entypo';
import {NAVIGATION_ROUTES} from '../../constants';

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 10,
  stepStrokeCurrentColor: colors.switchTrue,
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: colors.switchTrue,
  stepStrokeUnFinishedColor: colors.stepUnFinishedColor,
  separatorFinishedColor: colors.switchTrue,
  separatorUnFinishedColor: colors.stepUnFinishedColor,
  separatorCurrentColor: colors.buttonBackground,
  stepIndicatorFinishedColor: colors.switchTrue,
  stepIndicatorUnFinishedColor: colors.stepUnFinishedColor,
  stepIndicatorCurrentColor: colors.background,
  stepIndicatorLabelFontSize: 1,
  currentStepIndicatorLabelFontSize: 1,
  stepIndicatorLabelCurrentColor: colors.background,
  stepIndicatorLabelFinishedColor: colors.background,
  stepIndicatorLabelUnFinishedColor: colors.stepUnFinishedColor,
  labelColor: '#999999',
  labelSize: '100%',
  currentStepLabelColor: '#fe7013',
};

const StepCard = ({
  position,
  currentPosition,
  lessons,
  isQuestion,
  questionData,
  isEnrolled,
  chapterNumber,
  onPressIntro,
  gotoTest,
  courseId,
  chapterId,
  allVideosCompleted,
  isChapterCompleted,
  courseName,
}) => {
  const name = isQuestion ? questionData.questionName : lessons[position].name;
  const time = isQuestion
    ? questionData.timeDuration
    : lessons[position].timeDuration;
  const stepCard = () => (
    <View
      style={[
        styles.stepCardContainer,
        !isEnrolled && {width: '100%', marginLeft: 0},
      ]}>
      <View style={styles.lessonDetailsContainer}>
        {!isQuestion ? (
          <Text style={styles.lessonNumber}>
            {lessons[position].order.toString().length > 1
              ? lessons[position].order
              : '0' + lessons[position].order}
          </Text>
        ) : (
          <Image source={images.testIcon} style={styles.testIcon} />
        )}

        <View>
          <Text
            style={[
              styles.lessonName,
              !isEnrolled && {width: Dimensions.get('window').width - 90 - 80},
            ]}>
            {name > 35 ? name.slice(0, 35) + '...' : name}
          </Text>
          <Text style={styles.lessonDuration}>{time + ' mins'}</Text>
        </View>
      </View>
      {!isQuestion && (
        <TouchableOpacity
          onPress={() =>
            isEnrolled
              ? position > currentPosition
                ? () => {}
                : onPressIntro({
                    videoData: lessons[position],
                    courseId,
                    chapterId,
                  })
              : () => {}
          }
          // onPress={() =>
          //   !isEnrolled
          //     ? chapterNumber === 1 && position <= currentPosition
          //       ? onPressIntro({
          //           videoData: lessons[position],
          //           courseId,
          //           chapterId,
          //         })
          //       : () => {}
          //     : position > currentPosition
          //     ? () => {}
          //     : onPressIntro({
          //         videoData: lessons[position],
          //         courseId,
          //         chapterId,
          //       })
          // }
        >
          <Image
            source={
              isEnrolled
                ? position > currentPosition
                  ? images.greyPlayIcon
                  : images.redPlayIcon
                : images.greyPlayIcon
            }
            style={styles.playBtn}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return isEnrolled &&
    isQuestion &&
    !isChapterCompleted &&
    allVideosCompleted ? (
    <TouchableOpacity onPress={() => gotoTest(questionData)}>
      {stepCard()}
    </TouchableOpacity>
  ) : (
    stepCard()
  );
};

const LessonCardNotEnrolled = ({
  lessonCountArray,
  lessons,
  questionData,
  isEnrolled,
  chapterNumber,
  onPressIntro,
  courseId,
  chapterId,
}) => {
  return (
    <View>
      {lessonCountArray.map((lessonData, position) => (
        <StepCard
          key={position}
          position={position}
          currentPosition={0}
          lessons={lessons}
          isQuestion={questionData ? position === lessons.length : false}
          questionData={questionData}
          isEnrolled={isEnrolled}
          chapterNumber={chapterNumber}
          onPressIntro={onPressIntro}
          courseId={courseId}
          chapterId={chapterId}
        />
      ))}
    </View>
  );
};

const Stepper = ({
  chapter,
  isEnrolled = false,
  onPressIntro,
  courseId,
  courseName,
  allVideosCompleted,
  isChapterCompleted,
  progress,
  totalLength,
  totalChapter,
  ...props
}) => {
  const navigation = useNavigation();
  // console.log('dsd', chapter);
  const gotoTest = data => {
    navigation.navigate(NAVIGATION_ROUTES.MODULE_TEST_SCREEN, {data});
  };
  const lessons = chapter.videos[0].videoID
    .slice()
    .sort((a, b) => a.order - b.order);
  const questionData =
    chapter['questionnaire'] === undefined
      ? null
      : {
          courseID: courseId,
          courseName: courseName,
          chapterNumber: chapter.order,
          chapterName: chapter.name,
          chapterId: chapter._id,
          questionID: chapter.questionnaire.questionID._d,
          questionName: Array.isArray(chapter.questionnaire.questionID)
            ? chapter.questionnaire.questionID[0].name
            : chapter.questionnaire.questionID.name,
          totalNumberOfQuestions: chapter.numberOfQuestions,
          timeDuration: Array.isArray(chapter.questionnaire.questionID)
            ? chapter.questionnaire.questionID[0].timeDuration
            : chapter.questionnaire.questionID.timeDuration,
          questionAnswers: Array.isArray(chapter.questionnaire.questionID)
            ? chapter.questionnaire.questionID[0].questionAnswers
            : chapter.questionnaire.questionID.questionAnswers,
          progress: progress,
          totalLength: totalLength,
          order: chapter.order,
          totalChapter: totalChapter,
        };
  // console.log(chapter.order);
  return !isEnrolled ? (
    <LessonCardNotEnrolled
      courseId={courseId}
      chapterId={chapter._id}
      lessonCountArray={[...lessons, questionData && {}]}
      lessons={lessons}
      questionData={questionData}
      isEnrolled={isEnrolled}
      chapterNumber={chapter.order}
      onPressIntro={onPressIntro}
    />
  ) : (
    <StepIndicator
      customStyles={{
        ...customStyles,
        separatorFinishedColor:
          props.position === -1
            ? colors.stepUnFinishedColor
            : colors.switchTrue,
      }}
      currentPosition={props.position}
      stepCount={questionData ? lessons.length + 1 : lessons.length}
      labels={[...lessons, questionData && {}]}
      direction="vertical"
      renderLabel={({position}) => (
        <StepCard
          courseId={courseId}
          chapterId={chapter._id}
          position={position}
          currentPosition={props.position}
          lessons={lessons}
          isQuestion={questionData ? position === lessons.length : false}
          questionData={questionData}
          isEnrolled={isEnrolled}
          onPressIntro={onPressIntro}
          gotoTest={gotoTest}
          isChapterCompleted={isChapterCompleted}
          allVideosCompleted={allVideosCompleted}
          courseName={chapter.name}
        />
      )}
      renderStepIndicator={({position}) =>
        position <= props.position ? (
          <Icon name="check" size={15} color={colors.background} />
        ) : (
          <Icon2 name="dot-single" size={24} color={colors.background} />
        )
      }
    />
  );
};

export default Stepper;

const styles = StyleSheet.create({
  stepCardContainer: {
    height: 72,
    width: Dimensions.get('window').width - 90,
    backgroundColor: colors.stepCardBgColor,
    borderRadius: 6,
    marginBottom: 12,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  playBtn: {
    height: 24,
    width: 24,
  },
  testIcon: {
    height: 34,
    width: 24,
    marginRight: 21,
    marginLeft: 7,
  },
  lessonDetailsContainer: {
    flexDirection: 'row',
    // width: '85%',
    // width: Dimensions.get('window').width - 90 - 70,
    alignItems: 'center',
    // borderWidth: 1,
  },
  lessonNumber: {
    color: colors.skipLabel,
    fontFamily: fonts.BikoBold,
    fontSize: 32,
    lineHeight: 38,
    marginRight: 16,
  },
  lessonName: {
    color: colors.phoneNumberActive,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 6,
    // width: '80%',
    width: Dimensions.get('window').width - 90 - 125,
    // borderWidth: 2,
  },
  lessonDuration: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 12,
    lineHeight: 15,
  },
});
