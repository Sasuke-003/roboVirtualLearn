import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../assets';

const ShowMore = ({text = '', hideLength = 200}) => {
  const [hideText, setHideText] = useState(true);

  let result = hideText ? text?.slice(0, hideLength) + '...' : text;

  const toggleState = () => {
    setHideText(!hideText);
  };

  return (
    <>
      <Text style={styles.text}>
        {result}
        <Text onPress={toggleState} style={styles.showMore}>
          {' '}
          {hideText ? 'SHOW MORE' : 'SHOW LESS'}
        </Text>
      </Text>
    </>
  );
};

export default ShowMore;

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    color: colors.primaryText,
    fontFamily: fonts.proximaNovaMedium,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  showMore: {
    color: colors.primary,
    fontFamily: fonts.sFnSDisplayRegular,
    fontSize: 12,
    lineHeight: 15,
  },
});
