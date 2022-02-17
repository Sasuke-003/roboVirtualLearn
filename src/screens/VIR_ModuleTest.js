import React, {useState} from 'react';
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
import {api} from '../network';
import {
  setQuestionAnswer,
  clearQuestionAnswer,
  setModalVisible,
  getShowModal,
} from '../redux/reducers/questionAnswerReducer';
import {getQuestionAnswer} from '../redux/reducers/questionAnswerReducer';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {dispatch} from 'jest-circus/build/state';
import {ModuleTestSubmitModal} from '../components';
Icon.loadFont().then();

const data = {
  courseID: '61f9582925cc6ed00c14af41',
  courseName: 'python',
  chapterNumber: '2',
  chapterName: 'Setting up new project',
  chapterId: '61f9504d25cc6ed00c14af07', //added
  questionID: '61f94fed25cc6ed00c14af01', //added
  questionName: 'Module test 1', //added
  totalNumberOfQuestions: 2,
  timeDuration: 10,
  questionAnswers: [
    {
      order: 1,
      question:
        'The space agency of which country has recently released the images of the “The Lost Galaxy” of the Virgo Cluster?',
      options: ['India', 'U.S.A', 'Japan', 'China'],
      answer: 'U.S.A',
    },
    {
      order: 2,
      question:
        'As per the recent study by NASA and German Aerospace Center, some microbes are found on the Earth may survive in which planet?',
      options: ['Jupiter', 'Venus', 'Mars', 'Mercury'],
      answer: 'Mars',
    },
  ],
};

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

const ModuleTest = ({navigation, route}) => {
  //const data=route.params;
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
  const totalQuestions = data.totalNumberOfQuestions;
  const questionName = data.questionName;

  const renderHeader = () => {
    return (
      <View>
        <TouchableOpacity>
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
    const header = `Question ${quesNo} of ${totalQuestions}`;
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
    if (questionNumber !== totalQuestions - 1) {
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
        <Image />
        <Text>8 mins remaining</Text>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <View>
          <Text style={styles.chapNo}>Chapter {chapterNumber}</Text>
          <Text style={styles.chapName}>{chapterName}</Text>
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
              <ModuleTestSubmitModal
                courseID={courseID}
                chapterID={chapterID}
                questionaireID={questionaireID}
                chapterNumber={chapterNumber}
                chapterName={chapterName}
                courseName={courseName}
                totalQuestions={totalNumberOfQuestions}
              />
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
    paddingHorizontal: 10,
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
});
export default ModuleTest;
