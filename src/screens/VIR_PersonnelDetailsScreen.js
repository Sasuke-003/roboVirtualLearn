import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const VIR_PersonnelDetailsScreen = ({
  route: {
    params: {phoneNumber},
  },
  navigation,
}) => {
  return (
    <View>
      <Text>{phoneNumber}</Text>
    </View>
  );
};

export default VIR_PersonnelDetailsScreen;

const styles = StyleSheet.create({});
