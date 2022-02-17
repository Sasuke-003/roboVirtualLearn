import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

const VIR_VidioPlayer = ({
  route: {
    params: {url},
  },
  navigation,
}) => {
  const [sendProgress, setSendProgress] = useState(false);
  const [progress, setProgress] = useState('');

  const onLoad = data => {
    console.log('Data', data);
  };
  const onProgress = data => {
    console.log('Progress', data);
    setProgress(data.currentTime);
  };
  const onSeek = seek => {
    console.log('SEEK', seek);
  };
  const onBack = () => {
    // setSendProgress(true);
    navigation.goBack();
  };
  const onPause = () => {
    setSendProgress(true);
  };

  return (
    <VideoPlayer
      source={{uri: url}}
      style={styles.backgroundVideo}
      navigator={navigation}
      tapAnywhereToPause={true}
      onProgress={sendProgress && onProgress}
      playInBackground={false}
      playWhenInactive={false}
      // onLoad={onLoad}
      onSeek={onSeek}
      // seek={100}
      onPause={onPause}
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