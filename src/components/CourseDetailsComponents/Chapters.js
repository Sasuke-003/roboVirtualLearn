import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  useWindowDimensions,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {strings, fonts, images, colors} from '../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {api} from '../../network';
import {DownloadModal, SplitDataCard} from '..';
import Stepper from './Stepper';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import {Navigation} from 'react-native-feather';
import {NAVIGATION_ROUTES} from '../../constants';
import CameraRoll from '@react-native-community/cameraroll';

const loadingComponent = () => (
  <View
    style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator color={colors.secondaryText} />
  </View>
);

const ChapterContent = ({
  chapter,
  onPressIntro,
  courseId,
  courseName,
  currentPlayingVideoOrder,
  isEnrolled,
  allVideosCompleted,
  isChapterCompleted,
  previousChapterCompleted,
  progress,
  totalLength,
  totalChapter,
  progressVideos,
}) => {
  const [showContent, setShowContent] = useState(
    previousChapterCompleted && !isChapterCompleted ? true : false,
  );
  const [position, setPosition] = useState(
    isChapterCompleted
      ? currentPlayingVideoOrder + 2
      : allVideosCompleted
      ? currentPlayingVideoOrder
      : currentPlayingVideoOrder,
  );

  const renderTitle = () => (
    <View style={styles.chapterNameContainer}>
      <Text
        style={[
          styles.chapterTitleText,
          isChapterCompleted && {color: 'green'},
        ]}>{`${strings.courseDetailsSCreen.chapterText} ${chapter.order} - ${chapter.name}`}</Text>
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
          isEnrolled={isEnrolled}
          currentPlayingVideoOrder={currentPlayingVideoOrder}
          isChapterCompleted={isChapterCompleted}
          allVideosCompleted={allVideosCompleted}
          progress={progress}
          totalLength={totalLength}
          totalChapter={totalChapter}
          progressVideos={progressVideos}
        />
      )}
    </View>
  );
};

const Chapters = ({
  course,
  onPressIntro,
  isEnrolled,
  navigation,
  setIsEnrolled,
  setHideJoinCourseBtn,
}) => {
  const [courseVideoProgress, setCourseVideoProgress] = useState({videos: []});
  const [progress, setProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {height, width} = useWindowDimensions();
  const [showModal, setShowModal] = useState(false);
  // console.log(JSON.stringify(course, null, 2));
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          setIsLoading(true);
          const {data} = await api.course.getCourseVideoDetails(course?._id);
          setCourseVideoProgress(data);
          setIsLoading(false);
        } catch (e) {
          console.warn(e);
          setIsLoading(false);
        }
      };
      const getProgress = async () => {
        try {
          const progress = await api.course.getCourseProgress(course?._id);
          if (progress.status === 200) {
            // console.log(
            //   'Progress',
            //   JSON.stringify(progress.data.progressData, null, 2),
            // );
            setProgress(progress.data.progressData);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getData();
      getProgress();
    }, [isEnrolled]),
  );

  const chapters = course?.chapters
    ?.slice()
    .sort((a, b) => a.chapterID.order - b.chapterID.order);

  const RenderContinueButton = () => {
    const {videos} = courseVideoProgress;
    const currentVideo = videos
      .slice()
      .sort((a, b) => b.videoOrder - a.videoOrder)[0];

    const chapterNumber = () => {
      if (videos.length === 0) {
        return 1;
      }
      let nextChapterNo = 0;
      for (let i = 0; i < chapters.length; i++) {
        // console.warn(
        //   checkIfChapterIsCompleted(
        //     chapters[i].chapterID._id,
        //     chapters[i].chapterID.videos[0].videoID,
        //   ),
        // );
        nextChapterNo = i;
        if (
          checkIfChapterIsCompleted(
            chapters[i].chapterID._id,
            chapters[i].chapterID.videos[0].videoID,
          )
        )
          continue;
        if (chapters[i].chapterID._id === currentVideo.chapterID)
          return chapters[i].chapterID.order;
      }
      return chapters[nextChapterNo].chapterID.order;
    };

    const lessonNumber = () => {
      if (videos.length === 0) {
        return 1;
      }
      // if(currentVideo.progressRate < 90)
      return currentVideo.videoOrder;
      let chapterNumber = 0;
      // chapters.find((chapter, index) => {
      //   if(chapter.chapterID._id)
      // })
    };

    const currentVideoData = () => {
      if (videos.length === 0) {
        return chapters[0].chapterID.videos[0].videoID[0];
      }
      let nextChapter = 0;

      for (let i = 0; i < chapters.length; i++) {
        if (chapters[i].chapterID._id === currentVideo.chapterID) {
          let videoArray = chapters[i].chapterID.videos[0].videoID;
          for (let j = 0; j < videoArray.length; j++) {
            if (videoArray[j]._id === currentVideo.videoId) {
              if (i < chapters.length) nextChapter = i;
              if (currentVideo.progressRate < 90) return videoArray[j];
            }
          }
        }
      }
      if (nextChapter) {
        return chapters[nextChapter].chapterID.videos[0].videoID[0];
      }

      return chapters[0].chapterID.videos[0].videoID[0];
    };

    const onPressContinue = () => {
      onPressIntro({
        videoData: currentVideoData(),
        courseId: currentVideo ? currentVideo.courseID : course?._id,
        chapterId: currentVideo
          ? currentVideo.chapterID
          : chapters[0].chapterID._id,
      });
    };

    return (
      <TouchableOpacity onPress={onPressContinue}>
        <View style={styles.continueButton}>
          <Text style={styles.continueButtonText}>
            {`${strings.courseDetailsSCreen.continue} ${
              strings.courseDetailsSCreen.chapterText
            } ${chapterNumber()} ${
              strings.courseDetailsSCreen.lessonText
            } ${lessonNumber()}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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

  const currentPlayingVideo = () => {
    let currentVideo = 0;
    const videos = courseVideoProgress.videos;

    for (let i = 0; i < videos.length; i++) {
      if (videos[i].progressRate >= 99) currentVideo = videos[i];
    }
    return currentVideo;
  };

  const currentPlayingVideoOrder = (
    chapterNumber,
    chapterVideos,
    chapterId,
    currentChapterIndex,
  ) => {
    let currentVideoOrder = -1;
    let chapterVideosSorted = chapterVideos
      .slice()
      .sort((a, b) => a.order - b.order);
    const {videos} = courseVideoProgress;
    // if (videos.length === 0 && chapterNumber === 1) return 0;
    if (
      videos.length === 0 &&
      checkIfPreviousChapterCompleted(currentChapterIndex)
    )
      return 0;
    if (videos.length === 0) return -1;
    const currentVideo = videos
      .filter(video => video.chapterID === chapterId)
      .slice()
      .sort((a, b) => b.videoOrder - a.videoOrder)[0];
    if (!currentVideo && checkIfPreviousChapterCompleted(currentChapterIndex))
      return 0;
    if (!currentVideo) return -1;

    const index = chapterVideosSorted.findIndex(
      chapterVideo => chapterVideo._id === currentVideo.videoID,
    );
    if (currentVideo.progressRate < 90) currentVideoOrder = index;
    else currentVideoOrder = index + 1;
    // console.warn(currentVideo.videoID);

    // for (let i = 0; i < videos.length; i++) {
    //   if (videos[i].progressRate >= 99) currentVideo = videos[i].order;
    // }
    return currentVideoOrder;
  };

  const checkIfChapterIsCompleted = (chapterId, chapterVideos) => {
    if (!checkIfAllVideosCompleted(chapterId, chapterVideos)) return false;
    const {questionaire} = courseVideoProgress;
    const currentChapterQuestionaire = questionaire.filter(
      qs => qs.chapterID === chapterId,
    );
    const currentChapterPassingGrade = () => {
      for (let i = 0; i < chapters.length; i++) {
        if (chapters[i].chapterID._id === chapterId) {
          return Array.isArray(chapters[i].chapterID.questionnaire.questionID)
            ? chapters[i].chapterID.questionnaire.questionID[0].passingGrade
            : chapters[i].chapterID.questionnaire.questionID.passingGrade;
        }
      }
      return 50;
    };
    if (!currentChapterQuestionaire) return false;
    if (currentChapterQuestionaire.length === 0) return false;
    if (
      currentChapterQuestionaire[0].approvalRate >= currentChapterPassingGrade()
    )
      return true;
    // if (
    //   currentChapterQuestionaire[0].right > currentChapterQuestionaire[0].wrong
    // )
    //   return true;
    return false;
  };

  const checkIfAllVideosCompleted = (chapterId, chapterVideos) => {
    const {videos} = courseVideoProgress;
    const currentVideos = videos
      .filter(video => video.chapterID === chapterId)
      .slice()
      .sort((a, b) => a.videoOrder - b.videoOrder);
    if (currentVideos.length !== chapterVideos.length) return false;
    for (let i = 0; i < chapterVideos.length; i++) {
      if (currentVideos[i].progressRate < 90) return false;
    }
    return true;
  };

  const checkIfPreviousChapterCompleted = currentChapterIndex => {
    if (currentChapterIndex === 0) return true;
    const previousChapter = chapters[currentChapterIndex - 1];
    return checkIfChapterIsCompleted(
      previousChapter.chapterID._id,
      previousChapter.chapterID.videos[0].videoID,
    );
  };

  const chapterProgressVideos = chapterId => {
    const {videos} = courseVideoProgress;
    const currentVideos = videos
      .filter(video => video.chapterID === chapterId)
      .slice()
      .sort((a, b) => a.videoOrder - b.videoOrder);
    // console.warn(currentVideos);
    return currentVideos;
  };

  const firstBox = {
    title: 'Joined',
    data: moment(progress?.joinedOn).format('DD/MM/YYYY'),
  };
  const secondBox = {
    title: 'Completed',
    data: moment(progress?.completedOn).format('DD/MM/YYYY'),
  };

  let time = new Date(course?.courseContent?.totalLength * 60 * 1000)
    .toISOString()
    .substr(11, 8)
    .split(':');
  let hour = time[0] != '00' ? time[0] + 'h' : '';
  let min = time[1] != '00' ? time[1] + 'm' : '';
  let sec = time[2] != '00' ? time[2] + 's' : '';

  const thirdBox = {
    title: 'Duration',
    data: `${hour}${min}${sec}`,
  };

  //certificate section
  const onPressCertificate = () => {
    navigation.navigate(NAVIGATION_ROUTES.CERTIFICATE, {
      url: progress?.courseCertificateUrl,
      courseId: course._id,
    });
  };

  const checkPermission = async imageURI => {
    if (Platform.OS === 'ios') {
      //   downloadImage();
      savePicture(imageURI);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: strings.certificate.androidPermissionTitle,
            message: strings.certificate.androidPermissionMessage,
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted');
          //   downloadImage();
          savePicture(imageURI);
        } else {
          alert(strings.certificate.androidPermissionDenied);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  async function savePicture(imageURI) {
    try {
      setShowModal(true);
      await CameraRoll.save(imageURI);
      setShowModal(false);
      alert(strings.certificate.savingAlert);
    } catch (e) {
      console.log(e);
      setShowModal(false);
      alert(strings.certificate.errorAlert);
    }
  }

  const onDownloadPress = async () => {
    console.log('Downloading...', progress?.courseCertificateUrl);
    try {
      checkPermission(progress?.courseCertificateUrl);
    } catch (e) {
      console.log(e);
    }
  };

  return isLoading ? (
    loadingComponent()
  ) : (
    <>
      <View style={styles.container}>
        {!progress?.hasOwnProperty('completedOn') && <RenderContinueButton />}
        {renderCourseContent()}
        <View style={styles.courseContentsContainer}>
          {chapters.map((chapter, index) => (
            <ChapterContent
              key={index}
              chapter={chapter.chapterID}
              onPressIntro={onPressIntro}
              courseId={course?._id}
              courseName={course?.name}
              progress={progress}
              totalChapter={course.courseContent.chapter}
              totalLength={course?.courseContent?.totalLength}
              isChapterCompleted={checkIfChapterIsCompleted(
                chapter.chapterID._id,
                chapter.chapterID.videos[0].videoID,
              )}
              currentPlayingVideoOrder={currentPlayingVideoOrder(
                chapter.chapterID.order,
                chapter.chapterID.videos[0].videoID,
                chapter.chapterID._id,
                index,
              )}
              allVideosCompleted={checkIfAllVideosCompleted(
                chapter.chapterID._id,
                chapter.chapterID.videos[0].videoID,
              )}
              isEnrolled={isEnrolled}
              previousChapterCompleted={checkIfPreviousChapterCompleted(index)}
              progressVideos={chapterProgressVideos(chapter.chapterID._id)}
            />
          ))}
        </View>
      </View>
      {/* {console.log('dfdf', progress?.hasOwnProperty('completedOn'))} */}
      {progress?.hasOwnProperty('completedOn') && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Course Result</Text>
          <Text style={styles.resultAppRate}>
            {progress?.courseApprovalRate}%
          </Text>
          <Text style={styles.AppRate}>approval rate</Text>
          <SplitDataCard
            firstBox={firstBox}
            secondBox={secondBox}
            thirdBox={thirdBox}
            style={{marginHorizontal: 0}}
          />
          <View style={styles.certificateView}>
            <Text style={styles.certificateTitle}>Course Certificate</Text>
            <Icon
              name="download"
              size={25}
              color={colors.background}
              style={styles.downloadIcon}
              onPress={onDownloadPress}
            />
          </View>
          <DownloadModal showModal={showModal} setShowModal={setShowModal} />
          <View style={styles.certificateContainer}>
            <TouchableOpacity onPress={onPressCertificate}>
              <Image
                source={{
                  uri: progress?.courseCertificateUrl,
                }}
                style={styles.certificate(width)}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default Chapters;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
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
  continueButton: {
    backgroundColor: colors.buttonBackground,
    height: 46,
    borderRadius: 6,
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: colors.background,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  resultContainer: {
    backgroundColor: colors.phoneNumberActive,
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  resultTitle: {
    color: colors.background,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 22,
    marginBottom: 10,
  },
  resultAppRate: {
    color: colors.successColor,
    fontFamily: fonts.bikoRegular,
    fontSize: 74,
    letterSpacing: 0,
    lineHeight: 90,
    marginTop: 10,
  },
  AppRate: {
    color: colors.appRate,
    fontFamily: fonts.bikoRegular,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 19,
    top: -12,
    marginBottom: 10,
  },
  downloadIcon: {},
  certificateTitle: {
    color: colors.background,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 22,
  },
  certificateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    alignItems: 'center',
  },
  certificateContainer: {
    height: 250,
    overflow: 'hidden',
    borderRadius: 6,
    marginTop: 20,
  },
  certificate: width => ({
    // width,
    height: 250,
    resizeMode: 'cover',
  }),
});
