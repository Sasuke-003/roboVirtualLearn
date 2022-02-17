import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {images, strings, fonts, colors} from '../assets';

const VIR_SuccessScreen = ({navigation, route}) => {
  const {image, title, message, buttonName, onPressButton} = route.params;
  const renderContent = () => {
    return (
      <View style={styles.innerContainer}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    );
  };
  const renderButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPressButton}>
          <Text style={styles.buttonText}>{buttonName}</Text>
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
    paddingVertical: 20,
    backgroundColor: colors.background,
  },

  innerContainer: {
    paddingTop: Dimensions.get('window').height < 800 ? 70 : 180,
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
    fontSize: 35,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 35,
    paddingTop: 40,
    paddingBottom: 20,
    textAlign: 'center',
  },
  message: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 16,
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
