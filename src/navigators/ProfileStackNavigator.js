import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {VIR_ProfileEditScreen, VIR_ProfileScreen} from '../screens';

import {NAVIGATION_ROUTES} from '../constants';
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const ProfileStackNavigator = ({goToCreateNewPassword}) => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={NAVIGATION_ROUTES.PROFILE_SCREEN}>
      <Stack.Screen
        name={NAVIGATION_ROUTES.PROFILE_SCREEN}
        // component={VIR_ProfileScreen}
      >
        {props => (
          <VIR_ProfileScreen
            {...props}
            goToCreateNewPassword={goToCreateNewPassword}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name={NAVIGATION_ROUTES.PROFILE_EDIT}
        component={VIR_ProfileEditScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;

const styles = StyleSheet.create({});
