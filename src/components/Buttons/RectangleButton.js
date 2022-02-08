import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const RectangleButton = ({
  name,
  btnStyles = {},
  textStyles = {},
  onPress,
  ...prop
}) => {
  return (
    <TouchableOpacity onPress={onPress} {...prop}>
      <View style={[styles.buttonWrapper, btnStyles]}>
        <Text style={[styles.buttonText, textStyles]}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RectangleButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    width: 327,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
});
