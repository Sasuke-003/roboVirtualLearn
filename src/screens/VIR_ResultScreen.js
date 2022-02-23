import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DrawerHeader, ResultModal, SplitDataCard} from '../components';
import {colors, fonts, images, strings} from '../assets';
import {NAVIGATION_ROUTES} from '../constants';
import {useEffect} from 'react';
import {api} from '../network';

/**
 * [{
 * "approvalRate":<String>,
 * "chapterNo.":<Number>,
 * "chapterName":<String>,
 * "courseName":<String>,
 * "passingGrade":<Number>,
 * "TotalQsns":<Number>
 * "totalCorrectAnswers":<Number>,
 * "totalWrongAnswers":<Number> *"this can be optional"*,
 * "questionAnswers":<Array> [
 *      "order":<Number>,
 *      "question":<String>,
 *      "options":<Array of Strings>,
 *      "answer":<String>,
 *      "userAnswer":<String>,
 *      "type":<String> *"for ex. type:"Correct" and type:"Wrong"  (2 cases)"*
 *      ]
 *
 * }]
 *
 */

const ResultOptions = ({item, onPressCard}) => {
  return (
    <TouchableOpacity onPress={() => onPressCard(item)}>
      <View style={styles.resultCardContainer}>
        <View style={styles.resultView}>
          <Text style={styles.question}>Question{item?.order}</Text>
          <Text
            style={[
              styles.answer,
              item?.type === 'Wrong' && {color: colors.inputTextWrongBorder},
            ]}>
            {item?.type === 'Correct'
              ? strings.ResultScreen.correctOption
              : strings.ResultScreen.wrongOption}
          </Text>
        </View>
        <Image source={images.result.showAns} style={styles.showIcon} />
      </View>
    </TouchableOpacity>
  );
};

const VIR_ResultScreen = ({navigation, route: {params}}) => {
  const data = params;
  const questionAnswers = data?.questionAnswers;
  // const courseCompleted = true;
  console.log(JSON.stringify(data, null, 2));
  const [showModal, setShowModal] = useState(false);
  const {height, width} = useWindowDimensions();
  const [modalData, setModalData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const portrait = height > width;

  // const completedData = {
  //   courseId: '61f9582925cc6ed00c14af41',
  //   joinedOn: new Date(),
  //   completedOn: new Date(),
  //   totalCourseLength: 90,
  //   courseCompleted: true,
  // };

  useEffect(() => {
    const getProgress = async () => {
      try {
        const progress = await api.course.getCourseProgress(data.courseID);
        // console.warn(progress.data);
        if (progress.status === 200) {
          console.log(
            'Progress',
            JSON.stringify(progress.data.progressData, null, 2),
          );
          setProgressData(progress.data.progressData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProgress();
  }, []);
  console.log('pppppppp', progressData);
  const onBackPress = () => {
    if (data.courseCompleted) {
      navigation.replace(NAVIGATION_ROUTES.SUCCESS_SCREEN, {
        image: images.successScreen.courseComplete,
        title: 'Congratulations!',
        message: `You have completed the Course: ${data?.courseName} with`,
        approvalRate: progressData?.courseApprovalRate,
        buttonName: 'View Certificate',
        onPressButton: () => {
          navigation.replace(NAVIGATION_ROUTES.CERTIFICATE, {
            joined: progressData.joinedOn,
            completed: progressData.completedOn
              ? progressData.completedOn
              : new Date(),
            courseLength: data.totalLength,
            courseName: data.courseName,
            courseId: data.courseID,
          });
        },
      });
    } else {
      navigation.pop(1);
    }
  };
  const renderLeftIcon = () => {
    return (
      <Image source={images.result.closeIcon} style={styles.headerLeftIcon} />
    );
  };
  const renderHeader = () => {
    return (
      <DrawerHeader leftIcon={renderLeftIcon} leftIconOnPress={onBackPress} />
    );
  };

  const onPressCard = item => {
    setModalData(item);
    setShowModal(true);
  };

  const renderTopHeaderPart = () => {
    return (
      <SafeAreaView
        style={styles.safeAreaContainer}
        edges={['top', 'left', 'right']}>
        {renderHeader()}
        <View style={styles.detailsView}>
          <View style={styles.approvalRateView}>
            <Text style={styles.approvalRate}>{data?.approvalRate}</Text>
          </View>
          <Text style={styles.chapter}>
            {strings.ResultScreen.chapter} {data?.chapterNo}:{' '}
            {data?.chapterName}
          </Text>
        </View>
        <Text style={styles.courseName}>
          {strings.ResultScreen.course} {data?.courseName}
        </Text>
      </SafeAreaView>
    );
  };

  const renderListOfQuestions = () => {
    return (
      <View style={styles.qsnView}>
        <Text style={styles.subHeading}>{strings.ResultScreen.listOfQsn}</Text>
        {questionAnswers?.map((item, index) => {
          return (
            <ResultOptions item={item} key={index} onPressCard={onPressCard} />
          );
        })}
        {modalData && (
          <ResultModal
            setShowModal={setShowModal}
            showModal={showModal}
            data={modalData}
            setModalData={setModalData}
          />
        )}
      </View>
    );
  };

  const firstBox = {
    title: strings.ResultScreen.passingGrade,
    data: `${data?.passingGrade}/100`,
  };
  const secondBox = {
    title: strings.ResultScreen.correct,
    data: `${data?.totalCorrectAnswers}/${data?.totalQsns}`,
  };
  const thirdBox = {
    title: strings.ResultScreen.wrong,
    data: `${data?.totalWrongAnswers}/${data?.totalQsns}`,
  };

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {renderTopHeaderPart()}
      <SafeAreaView
        edges={['left', 'right']}
        style={styles.viewContainer(width)}>
        <View>
          <SplitDataCard
            firstBox={firstBox}
            secondBox={secondBox}
            thirdBox={thirdBox}
            style={styles.splitDataCard}
          />
          {renderListOfQuestions()}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default VIR_ResultScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  viewContainer: width => ({
    width: width,
  }),
  safeAreaContainer: {
    backgroundColor: colors.phoneNumberActive,
  },
  headerLeftIcon: {
    height: 17,
    width: 17,
    marginLeft: 24,
    marginTop: 10,
  },
  detailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 24,
    marginTop: 30,
    marginRight: 26,
    marginBottom: 24,
  },
  approvalRate: {
    color: colors.background,
    fontFamily: fonts.bikoRegular,
    fontSize: 42,
    lineHeight: 52,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  approvalRateView: {
    borderRadius: 4,
    backgroundColor: colors.categoryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  chapter: {
    color: colors.background,
    fontFamily: fonts.BikoBold,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 30,
    flexShrink: 1,
  },
  courseName: {
    marginLeft: 24,
    marginRight: 29,
    color: colors.background,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    marginBottom: 70,
  },
  qsnView: {
    marginHorizontal: 24,
  },
  subHeading: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    marginBottom: 30,
  },
  resultCardContainer: {
    flexDirection: 'row',
    paddingRight: 22,
    paddingBottom: 17,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.inputBorderBottomColor,
    marginBottom: 16,
  },
  showIcon: {
    height: 15,
    width: 10,
  },
  question: {
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 17,
    marginBottom: 6,
  },
  answer: {
    color: colors.switchTrue,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 15,
  },
  splitDataCard: {
    top: -40,
  },
});
