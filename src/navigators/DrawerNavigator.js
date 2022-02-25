import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {NAVIGATION_ROUTES} from '../constants';
import {HomeStackNavigator, ProfileStackNavigator} from './';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {colors, fonts} from '../assets';
import Icon from 'react-native-vector-icons/Feather';
import {CustomDrawer} from '../components';
import {api} from '../network';
import {utils} from '../utils';
import {
  VIR_MyCourses,
  VIR_NotificationScreen,
  VIR_SettingsScreen,
} from '../screens';
import {useState} from 'react';

const Drawer = createDrawerNavigator();

const DrawerIcons = {
  home: ({focused}) => (
    <Icon
      name="home"
      size={19}
      color={focused ? colors.inputTextWrongBorder : colors.skipLabel}
    />
  ),
  myCourse: ({focused}) => (
    <Icon
      name="briefcase"
      size={19}
      color={focused ? colors.inputTextWrongBorder : colors.skipLabel}
    />
  ),
  profile: ({focused}) => (
    <Icon
      name="user"
      size={19}
      color={focused ? colors.inputTextWrongBorder : colors.skipLabel}
    />
  ),
  notifications: ({focused}) => (
    <Icon
      name="bell"
      size={19}
      color={focused ? colors.inputTextWrongBorder : colors.skipLabel}
    />
  ),
  settings: ({focused}) => (
    <Icon
      name="settings"
      size={19}
      color={focused ? colors.inputTextWrongBorder : colors.skipLabel}
    />
  ),
};

const DrawerNavigator = ({navigation}) => {
  const [mobNum, setmobNum] = useState('');
  const goToCreateNewPassword = authToken => {
    navigation.navigate(
      NAVIGATION_ROUTES.CREATE_NEW_PASSWORD_SCREEN,
      authToken,
    );
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const {data} = await api.course.getUserDetails();
        setmobNum(data.data.number);

        utils.saveUserDetails(data);
      } catch (error) {
        logout();
      }
    };
    getUserData();
  }, []);

  const logout = () => {
    Alert.alert('Are you sure you want to quit the exam', '', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Quit',
        onPress: () => {
          utils.saveUserDetails(null);
          utils.clearAuthToken();
          navigation.reset({
            index: 0,
            routes: [{name: NAVIGATION_ROUTES.LANDING_SCREEN}],
          });
        },
      },
    ]);
  };
  const goToSearchScreen = () => {
    navigation.navigate(NAVIGATION_ROUTES.SEARCH_SCREEN);
  };
  const goToNextScreen = data => {
    navigation.navigate(NAVIGATION_ROUTES.PRIVACY_AND_TERMS_SCREEN, data);
  };
  const gotoCourseDetailsScreen = courseId => {
    navigation.navigate(NAVIGATION_ROUTES.COURSE_DETAILS_SCREEN, {courseId});
  };
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer logoutPress={logout} {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: colors.inputTextWrongBorder,
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerInactiveTintColor: colors.skipLabel,
        drawerStyle: styles.drawerStyle,
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name={NAVIGATION_ROUTES.HOME_STACK}
        options={{
          drawerIcon: DrawerIcons.home,
          drawerLabel: 'Home',
        }}>
        {props => (
          <HomeStackNavigator
            {...props}
            goToSearchScreen={goToSearchScreen}
            gotoCourseDetailsScreen={gotoCourseDetailsScreen}
          />
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name={NAVIGATION_ROUTES.MY_COURSES}
        options={{
          drawerIcon: DrawerIcons.myCourse,
          drawerLabel: 'My Courses',
        }}>
        {props => (
          <VIR_MyCourses
            {...props}
            goToSearchScreen={goToSearchScreen}
            gotoCourseDetailsScreen={gotoCourseDetailsScreen}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name={NAVIGATION_ROUTES.PROFILE_STACK}
        options={{
          drawerIcon: DrawerIcons.profile,
          drawerLabel: 'Profile',
          swipeEnabled: false,
        }}>
        {props => (
          <ProfileStackNavigator
            {...props}
            goToCreateNewPassword={goToCreateNewPassword}
          />
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name={NAVIGATION_ROUTES.SETTINGS_SCREEN}
        options={{
          drawerIcon: DrawerIcons.settings,
          drawerLabel: 'Settings',
          swipeEnabled: false,
        }}>
        {props => (
          <VIR_SettingsScreen
            {...props}
            goToNextScreen={goToNextScreen}
            mobNum={mobNum}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name={NAVIGATION_ROUTES.NOTIFICATION_SCREEN}
        component={VIR_NotificationScreen}
        options={{
          drawerIcon: DrawerIcons.notifications,
          drawerLabel: 'Notifications',
          swipeEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  drawerLabelStyle: {
    marginLeft: -20,
    fontFamily: fonts.proximaNovaRegular,
    fontSize: 16,
    fontWeight: '500',
  },
  drawerStyle: {
    width: '80%',
  },
});
