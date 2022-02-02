import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {VIR_OnBoardingScreen, VIR_NewAccountScreen} from '../screens';
import {NAVIGATION_ROUTES} from '../constants';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={NAVIGATION_ROUTES.NEW_ACCOUNT_SCREEN}>
      <Stack.Screen
        name={NAVIGATION_ROUTES.ON_BOARDING_SCREEN}
        component={VIR_OnBoardingScreen}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.NEW_ACCOUNT_SCREEN}
        component={VIR_NewAccountScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
