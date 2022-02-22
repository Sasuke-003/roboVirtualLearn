import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import {useSelector, useDispatch} from 'react-redux';
import {setTime, getTime} from '../redux/reducers/videoTimeReducer';
import {utils} from '../utils';
import {api} from '../network';

const VIR_VidioPlayer = ({
  route: {
    params: {url, videoData, courseId, chapterId},
  },
  navigation,
}) => {
  const [sendProgress, setSendProgress] = useState(false);
  const dispatch = useDispatch();

  const onLoad = data => {
    console.log('Data', data);
  };
  const onProgress = data => {
    dispatch(setTime(data.currentTime));
  };
  const onBack = async () => {
    // setSendProgress(true);

    try {
      const videoTime = Number.parseInt(
        videoData.timeDuration.slice(videoData.timeDuration.indexOf('.') + 1),
      );
      const watchedTill = Math.trunc(utils.getVideoTime());
      // console.warn(watchedTill);
      // console.warn((100 * watchedTill) / videoTime);
      const data = {
        courseID: courseId,
        chapterID: chapterId,
        videoID: videoData._id,
        videoOrder: videoData.order,
        progressRate: (100 * watchedTill) / videoTime,
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
      source={{uri: videoData.url}}
      style={styles.backgroundVideo}
      // navigator={navigation}
      tapAnywhereToPause={true}
      onProgress={onProgress}
      playInBackground={false}
      playWhenInactive={false}
      // onLoad={onLoad}
      // seek={100}
      // onPause={onPause}
      onBack={onBack}
      paused={pauseState}
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
