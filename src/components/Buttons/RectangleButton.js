import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors} from '../../assets';

const RectangleButton = ({
  name,
  btnStyles = {},
  textStyles = {},
  onPress,
  isDisabled = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled}>
      <View style={[styles.buttonWrapper, btnStyles]}>
        {isDisabled ? (
          <ActivityIndicator color={colors.background} />
        ) : (
          <Text style={[styles.buttonText, textStyles]}>{name}</Text>
        )}
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
