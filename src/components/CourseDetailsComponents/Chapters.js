import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  useWindowDimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {strings, fonts, images, colors} from '../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {api} from '../../network';
import {SplitDataCard} from '..';
import Stepper from './Stepper';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
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
}) => {
  const [showContent, setShowContent] = useState(false);
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
        />
      )}
    </View>
  );
};

const Chapters = ({course, onPressIntro, isEnrolled, progress}) => {
  const [courseVideoProgress, setCourseVideoProgress] = useState({videos: []});
  const [isLoading, setIsLoading] = useState(false);
  const {height, width} = useWindowDimensions();
  console.log(JSON.stringify(course, null, 2));
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

      getData();
    }, []),
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
      for (let i = 0; i < chapters.length; i++) {
        if (chapters[i].chapterID._id === currentVideo.chapterID)
          return chapters[i].chapterID.order;
      }
    };

    const lessonNumber = () => {
      if (videos.length === 0) {
        return 1;
      }
      return currentVideo.videoOrder;
    };

    const currentVideoData = () => {
      if (videos.length === 0) {
        return chapters[0].chapterID.videos[0].videoID[0];
      }
      for (let i = 0; i < chapters.length; i++) {
        if (chapters[i].chapterID._id === currentVideo.chapterID) {
          let videoArray = chapters[i].chapterID.videos[0].videoID;
          for (let j = 0; j < videoArray.length; j++) {
            if (videoArray[j]._id === currentVideo.videoId)
              return videoArray[j];
          }
        }
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
    if (!currentChapterQuestionaire) return false;
    if (currentChapterQuestionaire.length === 0) return false;
    if (
      currentChapterQuestionaire[0].right > currentChapterQuestionaire[0].wrong
    )
      return true;
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
  console.log('ppppppp', progress);
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

  return isLoading ? (
    loadingComponent()
  ) : (
    <>
      <View style={styles.container}>
        <RenderContinueButton />
        {renderCourseContent()}
        <View style={styles.courseContentsContainer}>
          {chapters.map((chapter, index) => (
            <ChapterContent
              key={index}
              chapter={chapter.chapterID}
              onPressIntro={onPressIntro}
              courseId={course?._id}
              courseName={course?.name}
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
          <Text style={styles.resultAppRate}>100%</Text>
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
              // onPress={onDownloadPress}
            />
          </View>
          <View style={styles.certificateContainer}>
            <Image
              source={{
                uri: '/Users/nitheshkumar/Library/Developer/CoreSimulator/Devices/0DBF97FA-CE93-402B-ADE0-BF478BB5B94D/data/Containers/Data/Application/CEF6B401-1774-45BA-B68E-1B2EB5407EC6/tmp/ReactNative/CFA8748B-7A5C-45E7-97F2-657E24A0C998.png',
              }}
              style={styles.certificate(width)}
            />
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
