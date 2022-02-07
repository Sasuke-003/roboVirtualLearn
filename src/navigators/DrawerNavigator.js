import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NAVIGATION_ROUTES} from '../constants';
import {HomeStackNavigator, ProfileStackNavigator} from './';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      // initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: '#000',
        drawerLabelStyle: {
          marginLeft: 20,
          fontSize: 14,
          fontWeight: Platform.OS === 'ios' ? '100' : null,
        },
        drawerInactiveTintColor: '#707070',
      }}>
      <Drawer.Screen
        name={NAVIGATION_ROUTES.HOME_STACK}
        component={HomeStackNavigator}
      />

      <Drawer.Screen
        name={NAVIGATION_ROUTES.PROFILE_STACK}
        component={ProfileStackNavigator}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
