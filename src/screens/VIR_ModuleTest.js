import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import {images, colors, strings, fonts} from '../assets';
import {
  setQuestionAnswer,
  clearQuestionAnswer,
  setModalVisible,
  getShowModal,
} from '../redux/reducers/questionAnswerReducer';
import {getQuestionAnswer} from '../redux/reducers/questionAnswerReducer';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/EvilIcons';
import {useDispatch, useSelector} from 'react-redux';
import useCountDown from 'react-countdown-hook';
import {api} from '../network';
import {ModuleTestSubmitModal} from '../components';
import {NAVIGATION_ROUTES} from '../constants';
import {StackActions} from '@react-navigation/native';
Icon.loadFont().then();
Icons.loadFont().then();

const Options = props => {
  const dispatch = useDispatch();
  const questionAnswer = useSelector(getQuestionAnswer);
  const index = questionAnswer.findIndex(
    value => value.userAnswer === props.option,
  );
  const isSelected = index >= 0 ? true : false;
  const bgColor = isSelected ? colors.primary : colors.background;

  const onPressOption = () => {
    dispatch(
      setQuestionAnswer({
        order: props.order,
        question: props.question,
        options: props.options,
        answer: props.answer,
        userAnswer: props.option,
        type: props.answer === props.option ? 'Correct' : 'Wrong',
      }),
    );
  };
  return (
    <TouchableOpacity onPress={onPressOption}>
      <View style={styles.optionContainer(bgColor)}>
        <View style={styles.iconContainer}>
          {isSelected && (
            <Image
              source={images.moduleTest.optionChecked}
              style={styles.icon}
            />
          )}
        </View>
        <Text style={styles.name(isSelected)}>{props.option}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ModuleTest = ({
  navigation,
  route: {
    params: {data},
  },
}) => {
  const courseID = data.courseID;
  const chapterID = data.chapterId;
  const questionaireID = data.questionID;
  const questionAnswers = data.questionAnswers;
  const [questionNumber, setQuestionNumber] = useState(0);
  const questionAnswer = useSelector(getQuestionAnswer);
  const dispatch = useDispatch();
  const showModal = useSelector(getShowModal);
  const courseName = data.courseName;
  const currentQuestion = questionAnswers[questionNumber];
  const chapterNumber = data.chapterNumber;
  const chapterName = data.chapterName;
  const totalNumberOfQuestions = data.totalNumberOfQuestions;
  const questionName = data.questionName;
  const initialTime = data.timeDuration * 60000; // initial time in milliseconds, defaults to 60000
  const interval = 1000; // interval to change remaining time amount, defaults to 1000
  const [initialRender, setInitialRender] = useState(true);
  const [timeLeft, {start, pause, resume, reset}] = useCountDown(
    initialTime,
    interval,
  );

  let time;
  const millis = timeLeft;
  let minutes =
    timeLeft > 60000 ? Math.ceil(millis / 60000) : Math.floor(timeLeft / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);

  if (minutes >= 1) {
    time = minutes + (minutes === 1 ? ' min' : ' mins');
  } else {
    time = (seconds < 10 ? '0' : '') + seconds + ' secs';
  }

  // start the timer during the first render
  React.useEffect(() => {
    start();
    setInitialRender(false);
  }, []);

  const totalRightAnswers = questionAnswer.filter(
    answer => answer.type === 'Correct',
  );
  const totalWrongAnswers = questionAnswer.filter(
    answer => answer.type === 'Wrong',
  );
  const right = totalRightAnswers.length;
  const wrong = totalWrongAnswers.length;

  const approvalRate = (right / totalNumberOfQuestions) * 100;
  const passingGrade = 75;
  const TestData = {
    approvalRate: Math.round(approvalRate),
    chapterNo: chapterNumber,
    chapterName: chapterName,
    courseName: courseName,
    totalQsns: totalNumberOfQuestions,
    passingGrade: passingGrade,
    totalCorrectAnswers: right,
    totalWrongAnswers: wrong,
    questionAnswers: questionAnswer,
  };
  const onPressButton = () => {
    navigation.dispatch(
      StackActions.replace(NAVIGATION_ROUTES.RESULT_SCREEN, TestData),
    );
    dispatch(clearQuestionAnswer());
  };
  const navData = {
    image: images.moduleTest.success,
    title: 'Congratulations!',
    message: `You have completed Chapter ${chapterNumber} - ${chapterName}, ${courseName}`,
    buttonName: 'Result',
    onPressButton: onPressButton,
  };
  const updateResult = async () => {
    try {
      const response = await api.course.updateQuestionairProgress(
        courseID,
        chapterID,
        questionaireID,
        approvalRate,
        right,
        wrong,
      );

      if (response.status === 200) {
        if (approvalRate > 75) {
          navigation.dispatch(
            StackActions.replace(NAVIGATION_ROUTES.SUCCESS_SCREEN, navData),
          );
        } else {
          alert('You did not meet the passing criteria');
          navigation.dispatch(
            StackActions.replace(NAVIGATION_ROUTES.COURSE_DETAILS_SCREEN, {
              courseId: courseID,
            }),
          );
          dispatch(clearQuestionAnswer());
        }
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.warn('Authentication Failed');
      } else {
        console.warn('Internal Server Error');
      }
    }
  };

  useEffect(() => {
    if (timeLeft === 0 && initialRender === false) {
      updateResult();
    }
  }, [timeLeft]);

  const onPressQuit = () => {
    navigation.dispatch(
      StackActions.replace(NAVIGATION_ROUTES.COURSE_DETAILS_SCREEN, {
        courseId: courseID,
      }),
    );
    dispatch(clearQuestionAnswer());
  };

  const onPressBack = () => {
    Alert.alert('Are you sure you want to quit the exam', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Quit',
        onPress: onPressQuit,
      },
    ]);
  };

  const renderHeader = () => {
    return (
      <View>
        <TouchableOpacity onPress={onPressBack}>
          <Image
            source={images.searchScreen.modalClose}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{questionName}</Text>
      </View>
    );
  };
  const renderContent = currentQuestion => {
    const quesNo = currentQuestion.order;
    const question = currentQuestion.question;
    const options = currentQuestion.options;
    const header = `Question ${quesNo} of ${totalNumberOfQuestions}`;
    return (
      <View>
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.question}>{question}</Text>
        {options.map((option, index) => (
          <Options
            option={option}
            key={index}
            index={index}
            order={currentQuestion.order}
            answer={currentQuestion.answer}
            question={currentQuestion.question}
            options={currentQuestion.options}
          />
        ))}
      </View>
    );
  };

  const onPressPrevious = () => {
    if (questionNumber > 0) {
      setQuestionNumber(previous => previous - 1);
    }
    return;
  };
  const onPressNext = () => {
    if (questionNumber !== totalNumberOfQuestions - 1) {
      setQuestionNumber(previous => previous + 1);
    }
    return;
  };

  const onPressSubmit = () => {
    dispatch(setModalVisible(true));
  };
  const renderTiming = () => {
    return (
      <View style={styles.timerContainer}>
        <Icons name="clock" color="grey" size={23} />
        <Text style={styles.time}>{time} remaining</Text>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.chapterContainer}>
          <Text style={styles.chapNo}>Chapter {chapterNumber}</Text>
          <Text style={styles.chapName} numberOfLines={2}>
            {chapterName}
          </Text>
        </View>
        <View style={styles.arrowContainer}>
          {questionNumber + 1 !== 1 ? (
            <TouchableOpacity
              style={{paddingHorizontal: 10}}
              onPress={onPressPrevious}>
              <Icon name="arrow-back" size={35} color="white" />
            </TouchableOpacity>
          ) : null}
          {questionNumber + 1 !== totalNumberOfQuestions ? (
            <TouchableOpacity
              style={{paddingHorizontal: 10}}
              onPress={onPressNext}>
              <Icon name="arrow-forward" size={35} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPressSubmit}>
              <View style={styles.submitContainer}>
                <Text style={styles.submit}>Submit</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {renderHeader()}
            {renderTiming()}
            {showModal && (
              <ModuleTestSubmitModal updateResult={updateResult} time={time} />
            )}
            {renderContent(currentQuestion)}
          </View>
        </ScrollView>
      </SafeAreaView>
      {renderFooter()}
    </>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 27,
  },
  backButton: {
    width: 20,
    height: 20,
  },
  title: {
    color: colors.primaryText,
    fontFamily: fonts.BikoBold,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 35,
    textAlign: 'left',
    paddingVertical: 20,
  },
  header: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 17,
    textAlign: 'left',
    paddingTop: 15,
    paddingBottom: 15,
  },
  timerContainer: {
    alignSelf: 'flex-end',
    paddingVertical: 20,
    flexDirection: 'row',
    paddingHorizontal: 7,
    alignItems: 'center',
  },
  question: {
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 26,
    textAlign: 'left',
    paddingTop: 10,
    paddingBottom: 30,
  },
  name: isSelected => ({
    color: isSelected ? colors.background : colors.skipLabel,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'left',
    width: '80%',
  }),
  optionContainer: bgColor => ({
    backgroundColor: bgColor,
    borderRadius: 6,
    shadowColor: 'rgba(0,0,0,0.1)',
    elevation: 'rgba(0,0,0,0.1)',
    marginVertical: 10,
    padding: 17,
    borderColor: colors.secondaryText,
    borderWidth: 0.17,
    flexDirection: 'row',
  }),
  icon: {
    width: 20,
    height: 20,
  },
  iconContainer: {
    width: 22,
    height: 22,
    borderRadius: 10.5,
    backgroundColor: 'rgba(122,122,122,0.03)',
    borderWidth: 1,
    borderColor: '#C5C5C5',
    marginHorizontal: 15,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 25,
    backgroundColor: '#2BB5F4',
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  chapterContainer: {
    width: '50%',
  },
  chapNo: {
    color: colors.background,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'left',
    paddingVertical: 5,
  },
  chapName: {
    color: colors.background,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: 'left',
  },
  submitContainer: {
    backgroundColor: colors.primary,
    padding: 11,
    borderRadius: 6,
  },
  submit: {
    color: colors.background,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 20,
    textAlign: 'center',
  },
  timerText: {
    textAlign: 'right',
    color: '#2BB5F4',
    fontSize: 16,
  },
  time: {
    color: '#2BB5F4',
    fontFamily: fonts.proximaNovaBold,
    fontSize: 14,
    paddingLeft: 5,
  },
});
export default ModuleTest;
