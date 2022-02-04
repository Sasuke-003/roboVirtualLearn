import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {VIR_OnBoardingScreen, VIR_LandingScreen} from '../screens';
import {NAVIGATION_ROUTES} from '../constants';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const StackNavigator = () => {
  const [newUser, setNewUser] = useState(true);

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={
        newUser
          ? NAVIGATION_ROUTES.ON_BOARDING_SCREEN
          : NAVIGATION_ROUTES.LANDING_SCREEN
      }>
      <Stack.Screen
        name={NAVIGATION_ROUTES.ON_BOARDING_SCREEN}
        component={VIR_OnBoardingScreen}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.LANDING_SCREEN}
        component={VIR_LandingScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
