import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {strings, fonts, images, colors} from '../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {api} from '../../network';

import Stepper from './Stepper';

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

const Chapters = ({course, onPressIntro, isEnrolled}) => {
  const [courseVideoProgress, setCourseVideoProgress] = useState({videos: []});
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          setIsLoading(true);
          const {data} = await api.course.getCourseVideoDetails(course?._id);
          setCourseVideoProgress(data);
          console.warn(data);
          setIsLoading(false);
        } catch (e) {
          console.warn(e);
          setIsLoading(false);
        }
      };

      getData();
    }, []),
  );

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
    console.warn(questionaire);
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
    console.warn(currentVideos);
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

  return isLoading ? (
    loadingComponent()
  ) : (
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
