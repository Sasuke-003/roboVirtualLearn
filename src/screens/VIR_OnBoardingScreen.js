import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {images, strings, fonts, colors} from '../assets';
import OnboardHeader from '../components/Header';
import Onboard from '../components/Onboard';
import AppIntroSlider from 'react-native-app-intro-slider';
import {NAVIGATION_ROUTES} from '../constants';
const slides = [
  {
    key: 1,
    title: strings.onBoardingPage.title_one,
    description: strings.onBoardingPage.description_one,
    image: images.onboardScreen.illustrationFirst,
  },
  {
    key: 2,
    title: strings.onBoardingPage.title_two,
    description: strings.onBoardingPage.description_two,
    image: images.onboardScreen.illustrationSecond,
  },
  {
    key: 3,
    title: strings.onBoardingPage.title_three,
    description: strings.onBoardingPage.description_three,
    image: images.onboardScreen.illustrationThird,
  },
];

const VIR_OnBoardingScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const portrait = height > width;
  console.log(height);
  const renderNextButton = () => {
    return (
      <View style={styles.nextButton}>
        <Image source={images.onboardScreen.nxtBtn} style={styles.btnImg} />
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View style={styles.nextButton}>
        <Image source={images.onboardScreen.doneBtn} style={styles.btnImg} />
      </View>
    );
  };
  const renderSkipButton = () => {
    return (
      <View style={styles.skipButton}>
        <Text style={styles.skipText}>SKIP</Text>
      </View>
    );
  };

  const goToLandingPage = () => {
    navigation.replace(NAVIGATION_ROUTES.LANDING_SCREEN);
  };

  const renderPortrait = () => {
    return (
      <>
        <OnboardHeader />
        <View style={styles.container(portrait, height)}>
          <AppIntroSlider
            data={slides}
            renderItem={item => <Onboard {...item} />}
            keyExtractor={item => item.key}
            renderDoneButton={renderDoneButton}
            showSkipButton={true}
            renderNextButton={renderNextButton}
            renderSkipButton={renderSkipButton}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
            onDone={goToLandingPage}
            onSkip={goToLandingPage}
          />
        </View>
      </>
    );
  };

  const renderLandscape = () => {
    return (
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {renderPortrait()}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.topContainer} edges={['top', 'right', 'left']}>
      {portrait ? renderPortrait() : renderLandscape()}
    </SafeAreaView>
  );
};

export default VIR_OnBoardingScreen;

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  container: (portrait, height) => ({
    flex: 1,
    height: height * 1.5,
  }),
  nextButton: {
    marginRight: 8,
  },
  btnImg: {
    height: 46,
    width: 46,
    resizeMode: 'contain',
  },
  skipButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '115%',
    marginLeft: 8,
  },
  skipText: {
    color: colors.skipLabel,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 14,
    lineHeight: 35,
  },
  dotStyle: {
    backgroundColor: colors.swipeDot,
    width: 6,
    height: 6,
  },
  activeDotStyle: {
    backgroundColor: colors.primary,
    width: 37,
    height: 6,
  },
});
