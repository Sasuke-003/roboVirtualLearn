import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import {useDeviceOrientation} from '@react-native-community/hooks';
import React from 'react';

const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};

const DrawerHeader = ({
  backgroundColor = 'transparent',
  leftIcon = null,
  leftIconOnPress = null,
  centerComponent = null,
  rightIcon = null,
  rightIconOnPress = null,
  style = {},
  right = 0,
}) => {
  const {landscape} = useDeviceOrientation();
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: backgroundColor,
        ...style,
        maxWidth: landscape ? '95%' : null,
      }}>
      <TouchableOpacity hitSlop={hitSlop} onPress={leftIconOnPress}>
        {leftIcon()}
      </TouchableOpacity>
      {centerComponent && centerComponent()}
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={rightIconOnPress}
        style={[styles.rightIcon, {right}]}>
        {rightIcon()}
      </TouchableOpacity>
    </View>
  );
};

export default DrawerHeader;

const styles = StyleSheet.create({
  container: {
    // marginTop: (Platform.OS === 'ios' ? 30 : 0) + 5,
    // height: 56,
    // flex: 1,
    // paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // marginBottom: 20,
    alignSelf: 'center',
    // height: '5%',
    marginTop: 20,
    // borderWidth: 2,
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
  },
});
