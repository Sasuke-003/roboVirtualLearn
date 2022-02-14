import {StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DrawerHeader} from '../components';
import {images, colors, strings, fonts} from '../assets';
import {getUserDetails} from '../redux/reducers/userReducer';
import {useSelector, useDispatch} from 'react-redux';
import {NAVIGATION_ROUTES} from '../constants';

const headerLeftIcon = () => (
  <Image style={styles.headerLeftIcon} source={images.hamburgerMenuIcon} />
);

const headerRightIcon = () => (
  <Image style={styles.headerRightIcon} source={images.searchIcon} />
);

const VIR_HomeScreen = ({navigation, goToSearchScreen}) => {
  const userDetails = useSelector(getUserDetails);

  const headerLeftIconOnPress = () => {
    navigation.openDrawer();
  };

  const headerRightIconOnPress = () => {
    goToSearchScreen();
  };

  const welcomeText = () => (
    <View style={styles.welcomeText}>
      <Text style={styles.hello}>{strings.homeScreen.hello}</Text>
      <Text style={styles.name}>{userDetails && userDetails.fullname}</Text>
    </View>
  );
  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
      <ScrollView style={styles.container}>
        <DrawerHeader
          leftIcon={headerLeftIcon}
          leftIconOnPress={headerLeftIconOnPress}
          rightIcon={headerRightIcon}
          rightIconOnPress={headerRightIconOnPress}
        />
        {welcomeText()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VIR_HomeScreen;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 24, height: '100%'},
  headerLeftIcon: {height: 17, width: 25},
  headerCenterComponent: {height: 24, width: 113, marginLeft: 32},
  headerRightIcon: {height: 22, width: 22},
  topContainer: {
    flex: 10,
  },
  welcomeText: {
    marginTop: 30,
  },
  hello: {
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 18,
    color: colors.secondaryText,
  },
  name: {
    fontFamily: fonts.biko,
    fontSize: 20,
    color: colors.phoneNumberActive,
    fontWeight: 'bold',
    marginTop: 8,
  },
});
