import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NAVIGATION_ROUTES} from '../constants';
import {HomeStackNavigator, ProfileStackNavigator} from './';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {colors, fonts} from '../assets';
import Icon from 'react-native-vector-icons/Feather';
import {CustomDrawer} from '../components';
import {api} from '../network';
import {utils} from '../utils';

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
  useEffect(() => {
    const getUserData = async () => {
      try {
        const {data} = await api.course.getUserDetails();
        utils.saveUserDetails(data);
      } catch (error) {
        console.warn(error);
        logout();
      }
    };
    getUserData();
  }, []);

  const logout = () => {
    utils.saveUserDetails(null);
    utils.clearAuthToken();
    navigation.reset({
      index: 0,
      routes: [{name: NAVIGATION_ROUTES.LANDING_SCREEN}],
    });
  };
  return (
    <Drawer.Navigator
      // initialRouteName="Home"

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
        component={HomeStackNavigator}
        options={{
          drawerIcon: DrawerIcons.home,
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name={NAVIGATION_ROUTES.PROFILE_STACK}
        component={ProfileStackNavigator}
        options={{
          drawerIcon: DrawerIcons.profile,
          drawerLabel: 'Profile',
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
