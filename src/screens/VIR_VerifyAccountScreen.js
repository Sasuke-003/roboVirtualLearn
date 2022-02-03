import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {images, strings, fonts, colors} from '../assets';
import {NAVIGATION_ROUTES} from '../constants';

const VIR_VerifyAccountScreen = ({
  route: {
    params: {afterVerifyGoto},
  },
  navigation,
}) => {
  const titleText =
    afterVerifyGoto === NAVIGATION_ROUTES.PERSONNEL_DETAILS_SCREEN
      ? strings.verifyAccountPage.title1
      : strings.verifyAccountPage.title2;
  const ButtonText =
    afterVerifyGoto === NAVIGATION_ROUTES.PERSONNEL_DETAILS_SCREEN
      ? strings.verifyAccountPage.buttonText1
      : strings.verifyAccountPage.buttonText2;
  return (
    <View>
      <Text>{titleText}</Text>
    </View>
  );
};

export default VIR_VerifyAccountScreen;

const styles = StyleSheet.create({});
