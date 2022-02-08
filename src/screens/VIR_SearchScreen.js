import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {images, strings, fonts, colors} from '../assets';
Icon.loadFont().then();

const VIR_SearchScreen = () => {
  const renderHeader = () => {
    return (
      <View>
        <Icon name="md-arrow-back-sharp" size={30} color={colors.skipLabel} />
      </View>
    );
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <View>{renderHeader()}</View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
export default VIR_SearchScreen;
