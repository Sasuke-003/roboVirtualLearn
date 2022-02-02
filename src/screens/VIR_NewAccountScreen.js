import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {images, strings, fonts, colors} from '../assets';

const VIR_NewAccountScreen = () => {
  return (
    <View>
      <Text
        style={{
          marginTop: 50,
          fontFamily: fonts.bikoRegular,
          fontSize: 30,
        }}>
        {strings.onBoardingPage.title}
      </Text>
      <Image
        source={images.newAccountScreen.googleIcon}
        style={{width: 20, height: 20}}
      />
    </View>
  );
};

export default VIR_NewAccountScreen;

const styles = StyleSheet.create({});
