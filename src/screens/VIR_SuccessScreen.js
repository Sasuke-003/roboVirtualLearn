import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {images, strings, fonts, colors} from '../assets';

const VIR_SuccessScreen = props => {
  const renderContent = () => {
    return (
      <View style={styles.innerContainer}>
        <Image
          source={images.successScreen.registerSuccess}
          style={styles.image}
        />
        <Text style={styles.title}>{strings.registerSuccessScreen.title}</Text>
        <Text style={styles.message}>
          {strings.registerSuccessScreen.message}
        </Text>
      </View>
    );
  };
  const renderButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text style={styles.buttonText}>
            {strings.registerSuccessScreen.buttonName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {renderContent()}
        {renderButton()}
      </View>
    </ScrollView>
  );
};

export default VIR_SuccessScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  innerContainer: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    color: colors.primaryText,
    fontFamily: fonts.BikoBold,
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 35,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
  },
  message: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 25,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingTop: 100,
    paddingBottom: 30,
  },
  buttonText: {
    color: colors.buttonBackground,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 18,
    letterSpacing: 0.4,
    lineHeight: 20,
    textAlign: 'center',
  },
});
