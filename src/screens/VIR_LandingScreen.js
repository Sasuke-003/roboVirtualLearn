import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {colors, fonts, images, strings} from '../assets';
import RectangleButton from '../components/Buttons/RectangleButton';
import {NavigationContainer} from '@react-navigation/native';
import {NAVIGATION_ROUTES} from '../constants';

const VIR_LandingScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const portrait = height > width;

  const onRegisterPress = () => {
    navigation.navigate(NAVIGATION_ROUTES.NEW_ACCOUNT_SCREEN);
  };
  const onLoginPress = () => {
    navigation.navigate(NAVIGATION_ROUTES.LOGIN_SCREEN);
  };

  const renderImageView = () => {
    return (
      <View style={styles.imgContainer(portrait)}>
        <Image
          source={images.landingScreen.landing}
          style={styles.landingImg(portrait, width, height)}
        />
      </View>
    );
  };

  const renderTitleView = () => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{strings.landingPage.welcome}</Text>
        <Text style={styles.subtitle}>{strings.landingPage.subtitle}</Text>
      </View>
    );
  };
  const renderButtonView = () => {
    return (
      <View style={styles.buttonContainer(portrait, height)}>
        <RectangleButton
          name={strings.landingPage.loginBtn}
          btnStyles={styles.btnStyles}
          textStyles={styles.textStyles}
          onPress={onLoginPress}
        />
        <Text style={styles.orText}>{strings.landingPage.or}</Text>
        <RectangleButton
          name={strings.landingPage.regBtn}
          btnStyles={styles.regBtn}
          textStyles={styles.regText}
          onPress={onRegisterPress}
        />
      </View>
    );
  };
  const renderPolicyView = () => {
    return (
      <View style={styles.policyContainer}>
        <Text style={styles.policyText}>
          {strings.landingPage.policy}
          <TouchableOpacity>
            <Text style={styles.termsText}>{strings.landingPage.terms}</Text>
          </TouchableOpacity>
          &
          <TouchableOpacity>
            <Text style={styles.termsText}>{strings.landingPage.privacy}</Text>
          </TouchableOpacity>
        </Text>
      </View>
    );
  };

  const renderPortrait = () => {
    return (
      <>
        <Header />
        {renderImageView()}
        <View style={styles.dataContainer}>
          {renderTitleView()}
          {renderButtonView()}
          {renderPolicyView()}
        </View>
      </>
    );
  };
  const renderLandscape = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderPortrait()}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {portrait ? renderPortrait() : renderLandscape()}
    </SafeAreaView>
  );
};

export default VIR_LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.background,
  },
  imgContainer: portrait => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 26,
    paddingRight: 28,
    paddingVertical: portrait ? 10 : 40,
  }),
  dataContainer: {
    flex: 1,
  },
  landingImg: (portrait, width, height) => ({
    width: portrait ? '100%' : width / 2,
    height: portrait ? '100%' : height / 1.7,
    resizeMode: 'contain',
  }),
  title: {
    color: colors.primaryText,
    fontFamily: fonts.bikoRegular,
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 35,
  },
  subtitle: {
    color: colors.secondaryText,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 15,
    lineHeight: 20,
  },
  titleContainer: {
    marginRight: 27,
    marginLeft: 24,
    paddingBottom: Platform.OS === 'android' ? 30 : 55,
  },
  buttonContainer: (portrait, height) => ({
    flex: 1,
    height: portrait ? null : height / 2.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  }),
  policyContainer: {
    alignItems: 'center',
    marginHorizontal: 43,
    height: 48,
    marginBottom: Platform.OS === 'android' ? 8 : 4,
    marginTop: 5,
  },
  policyText: {
    textAlign: 'center',
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 13,
    lineHeight: 22,
  },
  btnStyles: {
    backgroundColor: colors.primary,
  },
  textStyles: {
    color: colors.background,
  },
  regBtn: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  regText: {
    color: colors.primary,
  },
  orText: {
    fontFamily: fonts.proximaNovaRegular,
    color: colors.skipLabel,
    fontSize: 14,
    lineHeight: 20,
  },
  termsText: {
    color: colors.privacy,
  },
});
