import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {images, strings, fonts, colors} from '../assets';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={images.onboardScreen.onboardLogo} style={styles.logo} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  logo: {
    width: 182,
    height: 37,
  },
});
