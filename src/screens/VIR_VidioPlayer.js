import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import {useSelector, useDispatch} from 'react-redux';
import {setTime, setMaxLength} from '../redux/reducers/videoTimeReducer';
import {utils} from '../utils';
import {api} from '../network';

const VIR_VidioPlayer = ({
  route: {
    params: {url = null, videoData, courseId, chapterId, progressRate},
  },
  navigation,
}) => {
  const [sendProgress, setSendProgress] = useState(false);
  const dispatch = useDispatch();

  const onLoad = data => {
    console.log('Data', data);
  };
  const onProgress = data => {
    console.log(data);
    dispatch(setTime(data.currentTime));
    dispatch(setMaxLength(data.seekableDuration));
  };
  const onBack = async () => {
    // setSendProgress(true);
    if (url) return;
    if (progressRate >= 90) {
      navigation.goBack();
      console.warn('hello');
      return;
    }
    try {
      // const videoTime = Number.parseInt(
      //   videoData.timeDuration.slice(videoData.timeDuration.indexOf('.') + 1),
      // );
      const watchedTill = Math.trunc(utils.getVideoTime());
      console.warn(watchedTill);
      console.warn(utils.getVideoMaxLength());
      console.warn((100 * watchedTill) / utils.getVideoMaxLength());
      const progressRate = (100 * watchedTill) / utils.getVideoMaxLength();
      const data = {
        courseID: courseId,
        chapterID: chapterId,
        videoID: videoData._id,
        videoOrder: videoData.order,
        progressRate: progressRate >= 90 ? 100 : progressRate,
        watchedTill: watchedTill,
      };
      await api.course.updateVideoProgress(data);
    } catch (e) {
      console.warn(e.response);
      console.warn(e);
    }

    navigation.goBack();
  };
  const onPause = () => {
    setPauseState(true);
  };

  return (
    <VideoPlayer
      source={{uri: url ? url : videoData.url}}
      style={styles.backgroundVideo}
      // navigator={navigation}
      tapAnywhereToPause={true}
      onProgress={!url && onProgress}
      playInBackground={false}
      playWhenInactive={false}
      // onLoad={onLoad}
      // seek={100}
      // onPause={onPause}
      onBack={onBack}
    />
  );
};

export default VIR_VidioPlayer;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
