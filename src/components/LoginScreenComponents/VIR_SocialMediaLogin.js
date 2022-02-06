import {
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from 'react-native';

import React from 'react';
import {images} from '../../assets';
import {useDimension} from '../../hooks';

const VIR_SocialMediaLogin = () => {
  const {height, width, isPortrait} = useDimension();

  const renderFaceBookIcon = () => {
    return (
      <TouchableOpacity style={styles.iconContainer(isPortrait, width)}>
        <Image source={images.loginScreen.facebookIcon} style={styles.fb} />
      </TouchableOpacity>
    );
  };
  const renderGoogleIcon = () => {
    return (
      <TouchableOpacity style={styles.iconContainer(isPortrait, width)}>
        <Image
          source={images.newAccountScreen.googleIcon}
          style={styles.google}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderFaceBookIcon()}
      {renderGoogleIcon()}
    </View>
  );
};

export default VIR_SocialMediaLogin;

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('window').height < 700 ? 25 : 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: (isPortrait, width) => ({
    borderColor: 'rgba(119,134,158,0.3)',
    borderWidth: 1,
    borderRadius: 6,
    padding: 20,
    height: 45,
    width: isPortrait ? width / 2.6 : width / 2.5,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  }),

  fb: {
    width: 12,
    height: 22,
  },
  google: {
    width: 20,
    height: 20,
  },
});
