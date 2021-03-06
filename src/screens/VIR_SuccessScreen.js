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
  let {
    image,
    title,
    message,
    buttonName,
    onPressButton,
    approvalRate = null,
  } = route.params;

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
      <View style={styles.buttonContainer(approvalRate)}>
        <TouchableOpacity onPress={onPressButton}>
          <Text style={styles.buttonText}>{buttonName}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderApprovalRate = () => {
    return (
      <View style={{marginTop: 20}}>
        <Text style={styles.appRate}>{approvalRate}%</Text>
        <Text style={styles.appRateText}>approval rate</Text>
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
        {approvalRate ? renderApprovalRate() : null}
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
    paddingVertical: 10,
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
  buttonContainer: approvalRate => ({
    paddingTop: approvalRate !== null ? 10 : 70,
    paddingBottom: 30,
  }),
  buttonText: {
    color: colors.buttonBackground,
    fontFamily: fonts.proximaNovaBold,
    fontSize: 18,
    letterSpacing: 0.4,
    lineHeight: 20,
    textAlign: 'center',
  },
  appRate: {
    color: '#1EAB0D',
    fontFamily: fonts.bikoRegular,
    fontSize: 70,
    letterSpacing: 0,
    lineHeight: 90,
    textAlign: 'center',
    paddingVertical: 10,
  },
  appRateText: {
    color: colors.secondaryText,
    fontFamily: fonts.bikoRegular,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 19,
    textAlign: 'center',
    top: -20,
    // paddingVertical: 10,
  },
});
