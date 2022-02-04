import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  VIR_OnBoardingScreen,
  VIR_LandingScreen,
  VIR_NewAccountScreen,
  VIR_VerifyAccountScreen,
  VIR_PersonnelDetailsScreen,
} from '../screens';
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
      <Stack.Screen
        name={NAVIGATION_ROUTES.NEW_ACCOUNT_SCREEN}
        component={VIR_NewAccountScreen}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.VERIFY_ACCOUNT_SCREEN}
        component={VIR_VerifyAccountScreen}
        options={{gestureEnabled: false}}
        initialParams={{
          afterVerifyGoto: NAVIGATION_ROUTES.PERSONNEL_DETAILS_SCREEN,
          phoneNumber: '',
        }}
      />
      <Stack.Screen
        name={NAVIGATION_ROUTES.PERSONNEL_DETAILS_SCREEN}
        component={VIR_PersonnelDetailsScreen}
        initialParams={{
          phoneNumber: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
